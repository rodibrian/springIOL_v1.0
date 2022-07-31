create function before_insert_on_info_article_unite_magasin() returns trigger
    language plpgsql
as
$$
DECLARE
    quantite_en_stock_actuelement DOUBLE PRECISION = 0.0;
    quantite_niveau_unite DOUBLE PRECISION = 0.0;
    nouveau_quantite_en_stock DOUBLE PRECISION =0.0;
    quantite_stock_apres_operation DOUBLE PRECISION = 0.0;
    primary_unite_id BIGINT =0;
    item_count INT =0;
BEGIN
    -- recuperer l'unite primaire de l'article
    SELECT au.unite_id into primary_unite_id FROM article_unite au where article_id = new.article_id and au.niveau = 1;

    -- RECUPERATION DE LA QUANTITE NIVEAU
    SELECT au.quantite_niveau into quantite_niveau_unite FROM  article_unite au WHERE au.article_id = new.article_id AND au.unite_id = new.unite_id;

    -- RECUPERER LE NOMBRE EN STOCK
    SELECT count(article_id) into item_count FROM  stock  WHERE article_id = new.article_id AND unite_id = primary_unite_id AND magasin_id = new.magasin_id;

    -- RECUPERER LE STOCK ACTUEL
    SELECT count into quantite_en_stock_actuelement FROM  stock  WHERE article_id = new.article_id AND unite_id = primary_unite_id AND magasin_id = new.magasin_id;

    if item_count<=0 or quantite_en_stock_actuelement is null or quantite_en_stock_actuelement = 0.0 then

        nouveau_quantite_en_stock := new.quantite_ajout*quantite_niveau_unite;

        new.quantite_stock_apres_operation := new.quantite_ajout;

        -- INSERTION DANS LA TABLE STOCK

        insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,primary_unite_id,NEW.magasin_id,nouveau_quantite_en_stock);

    end if;

    if item_count > 0 then

        if new.type_operation = 'ENTRE' or new.type_operation like '%TRANSFERT%' then

            nouveau_quantite_en_stock := quantite_en_stock_actuelement + (new.quantite_ajout*quantite_niveau_unite) ;

            new.quantite_stock_apres_operation := (quantite_en_stock_actuelement/quantite_niveau_unite) + new.quantite_ajout;
            
            if new.type_operation like '%TRANSFERT%' AND  new.type_operation like '%VERS%' then
                   
                    nouveau_quantite_en_stock := quantite_en_stock_actuelement - (new.quantite_ajout*quantite_niveau_unite);

                    new.quantite_stock_apres_operation :=  (quantite_en_stock_actuelement/quantite_niveau_unite) - quantite_niveau_unite;
            
            end if;
            
        end if;

        if new.type_operation = 'VENTE' or new.type_operation = 'SORTIE' or new.type_operation = 'AVOIR' then

            nouveau_quantite_en_stock := quantite_en_stock_actuelement - (new.quantite_ajout*quantite_niveau_unite) ;

            new.quantite_stock_apres_operation :=  (quantite_en_stock_actuelement/quantite_niveau_unite) - new.quantite_ajout;
        
        end if;

        -- Mis-a-jour du stock
        update stock set count = nouveau_quantite_en_stock where article_id = NEW.article_id AND unite_id = primary_unite_id AND magasin_id = NEW.magasin_id;
        quantite_en_stock_actuelement :=0;

    end if;
    RETURN NEW; --ignored since this is after trigger 
END;
$$;
alter function before_insert_on_info_article_unite_magasin() owner to postgres;

