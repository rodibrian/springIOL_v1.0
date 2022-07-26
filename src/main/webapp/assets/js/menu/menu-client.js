$(function () {
    let namespace = "#menu-client ";
    let cfUrl = "http://localhost:8080/api/v1/externalEntities";

    $NOUVEAU_CLIENT  = true;
    let CLIENT = 0 ;
    // fermer l'info listes article facture

    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })

    // nouveau client
    $(namespace + '.btn-nouveau-client').on('click', function () {
        $NOUVEAU_CLIENT = true;
        $(namespace + '#nouveau-client').attr('data-value', 'nouveau-client');
        $(namespace + '#nouveau-client').modal('show')
        $(namespace + '#nouveau-client .modal-title').text('Nouveau Client');
    })

    // editer client
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
                    $client = [data.nom,data.adresse,data.numTel,0,$('<div class="action-client">\n' +
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
    // enregistrement nouveau client
    $(namespace + '#nouveau-client #btn-enregistrer-client').on('click', function () {
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
        enregistrerClientOuFournisseur(client);
    })
    // click client tr
    $(document).on('click', namespace + '#table-client tbody tr', function () {
        // get reference of selected facture
        $trClient = $(this);
        $(namespace + "#info-credit").addClass("show")
    })

    // suppression client
    $(document).on('click', namespace + '#table-client .deleteClient', function () {
        $trClient = $(this).closest('tr');
        $idModalDelete = "suppression-client";
        let idCf = $trClient.attr("id");
        create_confirm_dialog('Suppression Client', 'Voulez vous vraiment supprimer ce client (id : ' + $trClient.attr("id") + ') ?', $idModalDelete, 'Oui,supprimer', 'btn-danger')
            .on('click', function () {
                $.ajax({
                    type: "DELETE",
                    url: cfUrl+"/"+idCf,
                    contentType: 'application/json',
                    success: function (data){
                        $trClient.remove();
                        createToast('bg-danger', 'uil-trash-alt', 'Suppression fait', 'Le client est supprime avec success!');
                        hideAndRemove('#' + $idModalDelete);
                        $(namespace + "#info-credit").removeClass("show")
                    }
                });
            })
    })
    /*
    NOUVEAU CREDIT
     */

    $(namespace + '.btn-nouveau-credit').on('click', function() {
        $(namespace + '#nouveau-credit input#nomClient').val($trClient.children().eq(0).text())
    })

    $(namespace + '#nouveau-credit #btn-enregistrer-credit-client').on('click', function () {

        $montant = $(namespace + '#nouveau-credit input#somme').val();
        $description = $(namespace + '#nouveau-credit textarea#description').val();

        $credit = ['ref-00000',new Date().toLocaleDateString(), $montant, 0, $montant, $description];

        push_to_table_list(namespace + '.table-credit-client', '', $credit);

        createToast('bg-success', 'uil-check-sign', 'Credit enregistre', 'Nouveau credit enregistre avec success!');

        $(namespace + '#nouveau-credit input').val('');
        $(namespace + '#nouveau-credit textarea').val('');
    })
    /*
    SUpprimer credit
     */
    $(namespace + '.btn-supprimer-credit').on('click', function () {
        $modalId = "suppression-credit-client"
        create_confirm_dialog('Suppression credit', 'Voulez vraiment supprimer les credits impayes ?', $modalId, 'Oui, supprimer tout', 'btn-danger')
            .on('click', function() {
                $(namespace + '.table-credit-client tbody tr').remove();
                hideAndRemove('#' + $modalId);
                createToast('bg-danger', 'uil-check-sign', 'Dette supprime', 'Tout les credits client sont supprimer avec success!');
            })
    })
})