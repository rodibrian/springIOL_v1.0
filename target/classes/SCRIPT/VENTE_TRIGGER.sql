-- create trigger vente_trigger before insert or update on vente for each row execute procedure update_stock();