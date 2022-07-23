CREATE OR REPLACE FUNCTION update_stock() RETURNS TRIGGER AS
$$
DECLARE
    count_item INT = 0;
BEGIN
    select count(stock.article_id) into count_item from stock where stock.article_id = NEW.article_id AND stock.unite_id = NEW.unite_id AND stock.magasin_id = NEW.magasin_id;
    if count_item <=0 then
        insert into stock(article_id,unite_id,magasin_id,count) values (NEW.article_id,NEW.unite_id,NEW.magasin_id,NEW.quantite);
    else
        update stock set count = (select NEW.quantite + count ) where article_id = NEW.article_id AND unite_id = NEW.unite_id AND magasin_id = NEW.magasin_id;
    end if;
    RETURN NEW; --ignored since this is after trigger
END;
$$
    LANGUAGE plpgsql;
CREATE TRIGGER supply_trigger AFTER INSERT or update on approv  FOR EACH ROW EXECUTE PROCEDURE update_stock();