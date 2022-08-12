create function before_insert_on_info_article_unite_magasin() returns trigger
    language plpgsql
as
$$
DECLARE
    quantite_en_stock_actuelement DOUBLE PRECISION = 0.0;
    quantite_niveau_unite DOUBLE PRECISION = 0.0;
    nouveau_quantite_en_stock DOUBLE PRECISION =0.0;
    primary_unite_id BIGINT =0;
    item_count INT =0;
    nombre_quantite_alert INT = 0;
    ALERT_FILIALE_ID BIGINT = 0;
    QTT_PEREMPTION_DATE record;
    QUANTITE_AJOUT_TEMP DOUBLE PRECISION = 0.0;
BEGIN
    -- recuperer l'unite primaire de l'article
    SELECT au.unite_id into primary_unite_id FROM article_unite au where article_id = new.article_id and au.niveau = 1;

    -- RECUPERATION DE LA QUANTITE NIVEAU
    SELECT au.quantite_niveau into quantite_niveau_unite FROM  article_unite au WHERE au.article_id = new.article_id AND au.unite_id = new.unite_id;

    -- RECUPERER LE NOMBRE EN STOCK
    SELECT count(article_id) into item_count FROM  stock  WHERE article_id = new.article_id AND unite_id = primary_unite_id AND magasin_id = new.magasin_id;

    -- RECUPERER LE STOCK ACTUEL
    SELECT count into quantite_en_stock_actuelement FROM  stock  WHERE article_id = new.article_id AND unite_id = primary_unite_id AND magasin_id = new.magasin_id;

    -- MIS A JOUR DU QUANTITE PEREMPTION

    if     new.type_operation = 'VENTE'
        or (new.type_operation like '%TRANSFERT%' AND  new.type_operation like '%VERS%')
        or  new.type_operation = 'SORTIE'  then

        QUANTITE_AJOUT_TEMP := new.quantite_ajout;

        for  QTT_PEREMPTION_DATE in select ap.id, ap.date_peremption ,ap.quantite_peremption  from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id
                                    where iam.magasin_id =new.magasin_id and iam.unite_id=new.unite_id and iam.article_id = new.article_id and ap.quantite_peremption > 0 order by ap.date_peremption asc
            LOOP

                while QUANTITE_AJOUT_TEMP > 0 loop

                        if QUANTITE_AJOUT_TEMP >= QTT_PEREMPTION_DATE.quantite_peremption then

                            QTT_PEREMPTION_DATE.quantite_peremption :=0;

                        end if;

                        if QUANTITE_AJOUT_TEMP < QTT_PEREMPTION_DATE.quantite_peremption then

                            QTT_PEREMPTION_DATE.quantite_peremption := ( QTT_PEREMPTION_DATE.quantite_peremption - QUANTITE_AJOUT_TEMP);

                        end if;

                        QUANTITE_AJOUT_TEMP := ( QUANTITE_AJOUT_TEMP - QTT_PEREMPTION_DATE.quantite_peremption );

                    end loop;

            end loop;

    end if;

    if item_count = 0 then

        nouveau_quantite_en_stock := new.quantite_ajout*quantite_niveau_unite;

        new.quantite_stock_apres_operation := new.quantite_ajout;

        -- INSERTION DANS LA TABLE STOCK

        insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,primary_unite_id,NEW.magasin_id,nouveau_quantite_en_stock);

    end if;

    if item_count > 0 then

        if new.type_operation = 'ENTRE' or new.type_operation like '%TRANSFERT%' or new.type_operation = 'AVOIR' then

            nouveau_quantite_en_stock := quantite_en_stock_actuelement + (new.quantite_ajout*quantite_niveau_unite) ;

            new.quantite_stock_apres_operation := (quantite_en_stock_actuelement/quantite_niveau_unite) + new.quantite_ajout;


            if new.type_operation like '%TRANSFERT%' AND  new.type_operation like '%VERS%' then

                nouveau_quantite_en_stock := quantite_en_stock_actuelement - (new.quantite_ajout*quantite_niveau_unite);

                new.quantite_stock_apres_operation :=  (quantite_en_stock_actuelement/quantite_niveau_unite) - quantite_niveau_unite;
            end if;

            -- INITIALISATION DE LA QUANTITE EN ALERT DE CHAQUE ARTICLE ET FILIALE

            if new.type_operation = 'ENTRE' then

                select m.filiale_id into ALERT_FILIALE_ID from magasin m where m.id_magasin=new.magasin_id;

                select count(ia.filiale_id) into nombre_quantite_alert from inventory_alert ia where ia.article_id = new.article_id and ia.filiale_id = ALERT_FILIALE_ID;

                if nombre_quantite_alert = 0 then
                    insert into inventory_alert(article_id, filiale_id, quantite) values (new.article_id,ALERT_FILIALE_ID,0.0);
                end if;

            end if;

        end if;

        if new.type_operation = 'VENTE' or new.type_operation = 'SORTIE'then

            nouveau_quantite_en_stock := quantite_en_stock_actuelement - (new.quantite_ajout*quantite_niveau_unite) ;

            new.quantite_stock_apres_operation :=  (quantite_en_stock_actuelement/quantite_niveau_unite) - new.quantite_ajout;

        end if;

        if new.type_operation = 'INVENTAIRE' then

            nouveau_quantite_en_stock := new.quantite_ajout ;

            new.quantite_stock_apres_operation := new.quantite_ajout;

            -- ENREGISTRER L'ANNULATION
            insert into info_article_magasin (date, description, quantite_ajout,quantite_stock_apres_operation,reference, type_operation, article_id, magasin_id, unite_id, user_id)
            values (new.date,'Modification de la quantité en stock suite a un inventaire',quantite_en_stock_actuelement,new.quantite_ajout,new.reference,'ANNULATION',new.article_id,new.magasin_id,new.unite_id,new.user_id);

        end if;

        -- Mis-a-jour du stock

        update stock set count = nouveau_quantite_en_stock where article_id = NEW.article_id AND unite_id = primary_unite_id AND magasin_id = NEW.magasin_id;

        quantite_en_stock_actuelement :=0;

    end if;

    RETURN NEW; --ignored since this is after trigger

END;
$$;

alter function before_insert_on_info_article_unite_magasin() owner to postgres;



create function get_article_unite_quantite_peremption(magasinid bigint, articleid bigint, uniteid bigint)
    returns TABLE(date_peremption date, quantite_peremption double precision)
    language plpgsql
as
$$
begin
    return query select ap.date_peremption,sum(ap.quantite_peremption) from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id
                 where iam.magasin_id =magasinId and iam.unite_id=uniteId and iam.article_id = articleId and ap.quantite_peremption > 0 group by ap.date_peremption order by date_peremption;
end
$$;

alter function get_article_unite_quantite_peremption(bigint, bigint, bigint) owner to postgres;



