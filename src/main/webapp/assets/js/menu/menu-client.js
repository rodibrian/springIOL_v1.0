$(function () {

    /*-------------------------

            MENU CLIENT

     --------------------------*/
    let namespace = "#menu-client ";
    let cfUrl = "http://localhost:8080/api/v1/externalEntities";
    let filiale_id = $(namespace + '#filiale-id').attr("value-id");
    let user_id = $(namespace+"#user-id").attr("value-id");
    exportToExcel(namespace + '.btn-export-to-excel','client', namespace + '#table-client')
    $NOUVEAU_CLIENT  = true;
    let CLIENT = 0 ;
    /*
     fermer l'info listes article facture
     */
    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })

    /*
     nouveau client
     */

    $(namespace + '.btn-nouveau-client').on('click', function () {

        $NOUVEAU_CLIENT = true;
        $(namespace + '#nouveau-client').attr('data-value', 'nouveau-client');
        $(namespace + '#nouveau-client').modal('show')
        $(namespace + '#nouveau-client .modal-title').text('Nouveau Client');
    })

    /*
     editer client
     */

    $(document).on('click', namespace + '.editClient', function () {

        $NOUVEAU_CLIENT = false;
        $(namespace + '#nouveau-client').attr('data-value', 'editer-client');
        $(namespace + '#nouveau-client').modal('show')
        $(namespace + '#nouveau-client .modal-title').text('Editer Client');
        $trClient = $(this).closest('tr');
        $idCf = $trClient.attr("id");
        $(namespace + '#nouveau-client input#nomClient').val($trClient.children().eq(0).text());
        $(namespace + '#nouveau-client input#adresse').val($trClient.children().eq(1).text());
        $(namespace + '#nouveau-client input#contact').val($trClient.children().eq(2).text());
    })

    function enregistrerClientOuFournisseur(client){

        let cfResourceUrl = $NOUVEAU_CLIENT ? cfUrl :cfUrl+"/"+$idCf;
        let methodType = $NOUVEAU_CLIENT ? "POST" : "PUT";
        $.ajax({
            type: methodType,
            url: cfResourceUrl,
            contentType: 'application/json',
            data: JSON.stringify(client),
            success: function (data){
                if ($NOUVEAU_CLIENT){
                    $client = [data.nom,data.adresse,data.numTel,data.totalMontantTrosa,$('<div class="action-client">\n' +
                        '                <a id="" class="btn-sm btn-info editClient "><i class="uil-pen"></i></a>\n' +
                        '                <a id="" class="btn-sm btn-danger deleteClient "><i class="uil-trash-alt"></i></a>\n' +
                        '              </div>')];
                    push_to_table_list(namespace + '#table-client',data.id, $client);
                    createToast('bg-success', 'uil-icon-check', 'Client enregistre', 'Client enregistre avec succes!');
                }else {
                    $trClient.children().eq(0).text(client.nomClient);
                    $trClient.children().eq(1).text(client.adresse);
                    $trClient.children().eq(2).text(client.contact);
                    createToast('bg-success', 'uil-icon-check', 'Modification Client enregistre', 'Modification Client enregistre avec succes!');
                }
                $(namespace + '#nouveau-client input').val('');
                $NOUVEAU_CLIENT = true;
            }
        });
    }

    /*
     enregistrement nouveau client
     */

    /*
    mask et validation
     */

    $(function() {

        $(namespace + 'form').validate({
            rules: {
                adresse : {required:true},
                numCIN : {required:true},
                nomClient: {required:true},
                contact : {required: true},
            },
            messages : {
                adresse: {required: 'Adresse requise'},
                numCIN : {required: 'Numero CIN requis'},
                nomClient: {required: 'Nom client requis'},
                contact : {required: 'Contact requis'}
            }
        })

        $(namespace + '#numCIN').mask('999 999 999 999')
        $(namespace + '#contact').mask('+261 99 99 999 99')
        // $(namespace + '#nif').mask('X99999999')
    })

    function validation_client() {
        $(namespace + 'form').validate();
        return $(namespace + 'form').valid();
    }

    $(namespace + '#nouveau-client #btn-enregistrer-client').on('click', function () {

        if (validation_client()) {
            $(namespace + ".modal").modal('hide');
            filiale_id = $(namespace + '#filiale-id').attr("value-id");
            let nomClient = $(namespace + '#nouveau-client input#nomClient').val();
            let cin = $(namespace + '#nouveau-client input#numCIN').val();
            let adresse = $(namespace + '#nouveau-client input#adresse').val();
            let contact = $(namespace + '#nouveau-client input#contact').val();
            let nif = $(namespace + '#nouveau-client input#nif').val();
            let stat = $(namespace + '#nouveau-client input#stat').val();
            let cif = $(namespace + '#nouveau-client input#cif').val();
            let client = {};
            client.nom = nomClient;
            client.cin = cin;
            client.adresse = adresse;
            client.numTel = contact;
            client.nif = nif;
            client.stat = stat;
            client.cif = cif;
            client.typeCf = CLIENT;
            client.totalMontantTrosa = 0.0;
            client.filiale = {id : filiale_id};
            enregistrerClientOuFournisseur(client);
        }

    })

    /*
     click client tr
     */

    $(document).on('click', namespace + '#table-client tbody tr', function () {

        // get reference of selected facture

        $trClient = $(this);
        $(namespace + "#info-credit").addClass("show")

    })

    /*
     suppression client
     */

    $(document).on('click', namespace + '#table-client .deleteClient', function () {

        $trClient = $(this).closest('tr');
        $idModalDelete = "suppression-client";
        let idCf = $trClient.attr("id");
        create_confirm_dialog('Suppression Client', 'Voulez vous vraiment supprimer ce client (id : ' + $trClient.attr("id") + ') ?', $idModalDelete, 'Oui,supprimer', 'btn-danger')
            .on('click', ()=>{
                execute_ajax_request("DELETE",cfUrl+"/"+idCf,null,()=>{
                    $trClient.remove();
                    createToast('bg-danger', 'uil-trash-alt', 'Suppression fait', 'Le client est supprime avec success!');
                    hideAndRemove('#' + $idModalDelete);
                    $(namespace + "#info-credit").removeClass("show")
                })
            })
    })

    // INIT DOUBLE CLICK
    init_dblclick_table(namespace,"#table-client");

    init_modal_credit_dette_btn(namespace,"CREDIT",filiale_id,user_id);
    /*
    *  RECHERCHER CLIENT
    * */
    init_seach_cf_btn(0,namespace,"#table-client",filiale_id);
})