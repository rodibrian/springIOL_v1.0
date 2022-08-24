$(function () {
    /*--------------------------
            MENU CAISSE
     --------------------------*/
    let namespace = "#menu-caisse ";
    $filiale_id = $(namespace + '#filiale-id').attr("value-id");
    $user_id = $(namespace + '#user-id').attr("value-id");

    exportToExcel(namespace + '.btn-export-to-excel','caisse', namespace + '.table-liste-operation-caisse');
    // mode de paiement
    const ESPECE = "espece", CHEQUE = "cheque", CREDIT = "credit", VIREMENT = "virement";
    // type operation

    const OP_FACTURE = $(namespace + "#caisse-facture").attr('value-filter'),
        OP_DEPENSE = $(namespace + "#caisse-depense").attr('value-filter'),
        OP_RECETTE = $(namespace + "#caisse-recette").attr('value-filter'),
        OP_AVOIR = $(namespace + "#caisse-avoir").attr('value-filter'),
        OP_CREDIT = $(namespace + "#caisse-credit").attr('value-filter');
        OP_CONSO = $(namespace + "#caisse-consommation").attr('value-filter');
    // type operation
    const OP_IN = "entree", OP_OUT = "sortie";
    $(namespace + '#btn-creer-encaissement').attr('type-id', OP_IN);
    $(namespace + '#btn-creer-decaissement').attr('type-id', OP_OUT);

    /*
     ajout dans la table listes operation
     */

    /*
     OPERATION CAISSE
     */
    $(namespace + '#btn-creer-encaissement, #btn-creer-decaissement').on('click', function () {
        $typeOperation = $(this).attr('type-id');
        switch ($typeOperation) {
            case OP_IN :
                $("#operation-caisse .label-title").text("Encaissement");
                break;
            case OP_OUT:
                $("#operation-caisse .label-title").text("Decaissement");
                break;
        }
    })

    /*
     enregistrement operation
     */
    $("#btn-enregistrer-operation-caisse").click(function () {
        let reference = $('#operation-caisse #input-reference').val();
        let description = $('#operation-caisse #area-description').val();
        let montant = $('#operation-caisse #input-montant').val();
        let date = new Date();
        let ifc = {};
        ifc.reference = reference;
        ifc.operationCaisse = $typeOperation === OP_IN ? "ENCAISSEMENT" : "DECAISSEMENT";
        ifc.montantOperation = montant;
        ifc.date = date;
        ifc.modePayement = "ESPECE";
        ifc.user = {id:$user_id};
        ifc.filiale = {id : $filiale_id};
        ifc.description = description;
        let url = "http://localhost:8080/api/v1/ifc";
        execute_ajax_request("post",url,ifc,(data)=>{
            $(namespace+"#operation-caisse").modal("hide");
            switch ($typeOperation) {
                case OP_IN :
                    push_to_table_list(
                        namespace + ".table-liste-operation-caisse",
                        "",
                        [data.reference,
                            data.operationCaisse,
                            data.date,
                            data.description,
                            ifc.modePayement,
                            montant]
                    )
                        .attr('data-filter', [OP_RECETTE, ESPECE])
                    createToast('bg-success', 'uil-folder-check', 'Encaissement enregistre', 'ENcaissement enregistrer avec success!');
                    impression_EncDecAissement(true)
                    break;
                case OP_OUT :
                    push_to_table_list(
                        namespace + ".table-liste-operation-caisse",
                        "",
                        [data.reference,
                            data.operationCaisse,
                            data.date,
                            data.description,
                            ifc.modePayement,
                            montant]
                    )
                        .attr('data-filter', [OP_DEPENSE, OP_CONSO])
                    createToast('bg-warning', 'uil-folder-check', 'Decaissement enregistre', 'Decaissement enregistrer avec success!');
                    impression_EncDecAissement(false)
                    break;
            }
            // vider les champs
            $('#operation-caisse #input-reference').val('');
            $('#operation-caisse #input-montant').val(0);
            $('#operation-caisse #area-description').val('');
            $('#operation-caisse #input-categorie').val('');
        });
    })
    // FILTRER PAR DATE
    $(namespace+"#btn-search-filter").click(()=>{
        let date_debut = $(namespace+"#input-date-debut").val();
        let date_fin = $(namespace+"#input-date-fin").val();
        if (date_debut!==undefined && date_fin!==undefined){
            $filiale_id = $(namespace + '#filiale-id').attr("value-id");
            let url = "http://localhost:8080/api/v1/ifc/"+$filiale_id+"/date/"+date_debut+"/"+date_fin;
            execute_ajax_request("get",url,null,(data)=>{
                clear_table(namespace + ".table-liste-operation-caisse");
                data.forEach(value =>{
                    let tr = [value.reference,
                        value.operationCaisse,
                        value.date,
                        value.description,
                        value.modePayement,
                        value.montantOperation];
                    push_to_table_list(namespace + ".table-liste-operation-caisse",value.id,tr);
                })
            })
        }
    })
    /*
     evenement des types
     */
    $(namespace + ".type-caisse").on('click', function () {
        filter_table(namespace + ".table-liste-operation-caisse", "value-filter", $(this).attr('value-filter'));
    })
    /*
     function filter table
     */
    function filter_table($idtable, $attr, $value_filter){
        $table = $($idtable + " tbody tr");
        let filter_type = "";
        if ($value_filter==="FACTURE" || $value_filter==="DECAISSEMENT" || $value_filter==="AVOIR") filter_type = "OPERATION";
        else filter_type = "MODE-PAYEMENT";
        $filiale_id = $(namespace + '#filiale-id').attr("value-id");
        let url = "http://localhost:8080/api/v1/ifc/"+$filiale_id+"/"+filter_type+"/"+$value_filter;
        console.log(url);
        execute_ajax_request("get",url,null,(data)=>{
            clear_table($idtable);
            data.forEach(value =>{
                let tr = [value.reference,
                    value.operationCaisse,
                    value.date,
                    value.description,
                    value.modePayement,
                    value.montantOperation];
                push_to_table_list($idtable,value.id,tr);
            })
        })
    }
    /*
    facturation
     */

    function impression_EncDecAissement($isEnc) {
        generer_ticket_EncDecAissement($isEnc);
        generer_facture_EncDecAissement($isEnc);
    }

    function generer_ticket_EncDecAissement($isEnc) {
        let space = namespace + '#impression-ticket-encaissement-ou-decaissement ';
        // receuille des données
        $title = $isEnc ? 'Encaissement' : 'Decaissement';
        $reference = $(namespace + '#operation-caisse #input-reference').val();
        $categorie = $(namespace + '#operation-caisse #input-categorie').val();
        $montant = $(namespace + '#operation-caisse #input-montant').val();
        $description = $(namespace + '#operation-caisse #area-description').val();
        // affectation
        $(space + '.label-title').text($title)
        $(space + '.label-reference').text($reference)
        $(space + '.label-motif').text('[' + $categorie + '] ' + $description)
        $(space + '.label-montant').text($montant + 'Ar')
        $(space).printThis()
    }

    function generer_facture_EncDecAissement($isEnc) {
        let space = namespace + '#impression-facture-encaissement-ou-decaissement ';
        // receuille des données
        $title = $isEnc ? 'Encaissement' : 'Decaissement';
        $reference = $(namespace + '#operation-caisse #input-reference').val();
        $categorie = $(namespace + '#operation-caisse #input-categorie').val();
        $montant = $(namespace + '#operation-caisse #input-montant').val();
        $description = $(namespace + '#operation-caisse #area-description').val();
        // affectation
        $(space + '.label-title').text($title)
        $(space + '.label-reference').text($reference)
        $(space + '.td-reference').text($reference)
        $(space + '.td-description').text('[' + $categorie + '] ' + $description)
        $(space + '.td-montant').text($montant + 'Ar')
        $(space).printThis()
    }
})