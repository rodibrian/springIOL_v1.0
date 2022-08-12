-- call mettre_a_jour_quantite_en_peremption(1,1,2,1);
DO $$
    DECLARE
        row RECORD;
        QUANTITE_AJOUT_TEMP double precision = 11;
    BEGIN

        FOR row IN select ap.id,ap.quantite_peremption from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id
                   where iam.magasin_id =1 and iam.unite_id=2 and iam.article_id = 1 and ap.quantite_peremption > 0 order by ap.date_peremption asc LOOP

                if QUANTITE_AJOUT_TEMP > 0 then

                    if QUANTITE_AJOUT_TEMP > row.quantite_peremption then

                        RAISE notice '% SUPERIEURE', QUANTITE_AJOUT_TEMP;

                        update approv set quantite_peremption = 0 where id = row.id;

                    end if;

                    if QUANTITE_AJOUT_TEMP < row.quantite_peremption then

                        update approv set quantite_peremption = ( row.quantite_peremption - QUANTITE_AJOUT_TEMP)  where id = row.id;

                        RAISE notice '% QUANTITE INFERIEURE', QUANTITE_AJOUT_TEMP;

                    end if;

                    QUANTITE_AJOUT_TEMP := ( QUANTITE_AJOUT_TEMP - row.quantite_peremption );

                    RAISE notice '%', QUANTITE_AJOUT_TEMP;

                end if;

            END LOOP;

    END; $$;

