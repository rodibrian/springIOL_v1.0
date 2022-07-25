-- CREATE OR REPLACE FUNCTION update_stock() RETURNS TRIGGER AS
-- $$
-- DECLARE
--     count_item INT = 0;
-- BEGIN
--     select count(stock.article_id) into count_item from stock where stock.article_id = NEW.article_id AND stock.unite_id = NEW.unite_id AND stock.magasin_id = NEW.magasin_id;
--     if count_item <=0 then
--         insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,NEW.unite_id,NEW.magasin_id,NEW.quantite);
--     else
--         update stock set count = (select NEW.quantite + count ) where article_id = NEW.article_id AND unite_id = NEW.unite_id AND magasin_id = NEW.magasin_id;
--     end if;
--     RETURN NEW; --ignored since this is after trigger
-- END;
-- $$
--     LANGUAGE plpgsql;
-- CREATE TRIGGER supply_trigger AFTER INSERT or update on approv  FOR EACH ROW EXECUTE PROCEDURE update_stock();
create function update_stock() returns trigger
    language plpgsql
as
$$
DECLARE
    count_item INT = 0;
BEGIN

    -- Si l'evenement vient de la table vente ou de la table sortie alors on fait UPDATE
    if tg_table_name = 'vente' then

        update stock set count = (count - new.quantite) where article_id = new.article_id AND unite_id = new.unite_id  AND magasin_id = new.magasin_id;

    else if tg_table_name = 'approv' or tg_table_name = 'avoir' then

        select count(stock.article_id) into count_item from stock where stock.article_id = NEW.article_id AND stock.unite_id = NEW.unite_id AND stock.magasin_id = NEW.magasin_id;

        if count_item <=0 then

            insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,NEW.unite_id,NEW.magasin_id,NEW.quantite);

        else

            update stock set count = (NEW.quantite + count ) where article_id = NEW.article_id AND unite_id = NEW.unite_id AND magasin_id = NEW.magasin_id;

        end if;

    end if;

    end if;

    RETURN NEW; --ignored since this is after trigger
END;
$$;

alter function update_stock() owner to postgres;

