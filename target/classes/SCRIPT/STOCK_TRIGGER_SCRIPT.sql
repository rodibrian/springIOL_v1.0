create function update_stock() returns trigger
    language plpgsql
as
$$
DECLARE

    count_item INT = 0;
    stock_quantite DOUBLE PRECISION = 0.0;
    primary_unite_id BIGINT =0;

BEGIN

    -- recuperer l'unite primaire de l'article
    SELECT au.unite_id into primary_unite_id FROM article_unite au where article_id = new.article_id and au.niveau = 1;

    -- CONVERSION A LA NIVEAU
    SELECT au.quantite_niveau into stock_quantite FROM  article_unite au WHERE au.article_id = new.article_id AND au.unite_id = new.unite_id;

    -- Si l'evenement vient de la table vente ou de la table sortie alors on fait UPDATE

    if tg_table_name = 'vente' then

        update stock set count = (count - stock_quantite)where article_id = new.article_id AND unite_id = primary_unite_id AND magasin_id = new.magasin_id;

    else if tg_table_name = 'approv' then

        select count(stock.article_id) into count_item from stock where stock.article_id = NEW.article_id AND stock.unite_id = primary_unite_id AND stock.magasin_id = NEW.magasin_id;

        if count_item <=0 then

            insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,primary_unite_id,NEW.magasin_id,(NEW.quantite/stock_quantite));

        else

            update stock set count = ( (NEW.quantite/stock_quantite) + count )where article_id = NEW.article_id AND unite_id = primary_unite_id AND magasin_id = NEW.magasin_id;

        end if;

    end if;

    end if;

    RETURN NEW; --ignored since this is after trigger

END;
$$;

alter function update_stock() owner to postgres;

