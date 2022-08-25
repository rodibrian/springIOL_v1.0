create procedure mettre_a_jour_quantite_en_peremption(IN id_magasin bigint, IN id_article bigint, IN id_unite bigint, IN nouveau_quantite double precision)
    language plpgsql
as
$$
DECLARE
    row RECORD;
    QUANTITE_AJOUT_TEMP double precision = 0;
BEGIN

    QUANTITE_AJOUT_TEMP := nouveau_quantite;

    FOR row IN select ap.id,ap.quantite_peremption from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id
               where iam.magasin_id =id_magasin and iam.unite_id=id_unite and iam.article_id = id_article and ap.quantite_peremption > 0 order by ap.date_peremption asc
        LOOP

            if QUANTITE_AJOUT_TEMP > 0 then

                if QUANTITE_AJOUT_TEMP > row.quantite_peremption then

                    update approv set quantite_peremption = 0 where id = row.id;

                end if;

                if QUANTITE_AJOUT_TEMP < row.quantite_peremption then

                    update approv set quantite_peremption = ( row.quantite_peremption - QUANTITE_AJOUT_TEMP)  where id = row.id;

                end if;

                QUANTITE_AJOUT_TEMP := ( QUANTITE_AJOUT_TEMP - row.quantite_peremption );

            end if;

        END LOOP;
end;
$$;

alter procedure mettre_a_jour_quantite_en_peremption(bigint, bigint, bigint, double precision) owner to postgres;

