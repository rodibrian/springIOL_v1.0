create function update_caisse_filiale() returns trigger
    language plpgsql
as
$$
DECLARE
    montant_caisse double precision=0.0;
    nombre_element BIGINT =0.0;
BEGIN

    select count(c.id) into nombre_element from caisse c where c.filiale_id = new.filiale_id and c.mode_payement = new.mode_payement;

    if nombre_element = 0 then

        insert into caisse (value, filiale_id, mode_payement)  values (new.montant_operation,new.filiale_id,new.mode_payement);
        new.montant_apres_operation := new.montant_operation;

    end if;

    if nombre_element > 0 then

        select value into montant_caisse from caisse c where c.filiale_id = new.filiale_id and c.mode_payement = new.mode_payement;

        if new.operation_caisse = 'FACTURE' or new.operation_caisse = 'ENCAISSEMENT' then

            if montant_caisse = 0.0 then
                
                update caisse c set value = new.montant_operation where c.filiale_id = new.filiale_id and c.mode_payement = new.mode_payement;
            
                new.montant_apres_operation := new.montant_operation;
            
            end if;

            if montant_caisse > 0.0 then

                update caisse c set value = montant_caisse +new.montant_operation where c.filiale_id = new.filiale_id;

                new.montant_apres_operation:= montant_caisse + new.montant_operation;

            end if;

        end if;

        if new.operation_caisse = 'DECAISSEMENT' or new.operation_caisse = 'AVOIR' then

            if montant_caisse > 0.0 then

                update caisse c set value = montant_caisse-new.montant_operation where c.filiale_id = new.filiale_id and c.mode_payement = new.mode_payement;

                new.montant_apres_operation:=montant_caisse-new.montant_operation;

            end if;

        end if;

    end if;

    RETURN NEW; --ignored since this is after trigger
END;
$$;

alter function update_caisse_filiale() owner to postgres;

