$(function () {

    let namespace = "#menu-client ";


    // fermer l'info listes article facture

    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })

    // nouveau client
    $(namespace + '.btn-nouveau-client').on('click', function () {
        $(namespace + '#nouveau-client').attr('data-value', 'nouveau-client');
        $(namespace + '#nouveau-client').modal('show')

        $(namespace + '#nouveau-client .modal-title').text('Nouveau Client');
    })


    // editer client
    $(document).on('click', namespace + '.editClient', function () {
        $(namespace + '#nouveau-client').attr('data-value', 'editer-client');
        $(namespace + '#nouveau-client').modal('show')

        $(namespace + '#nouveau-client .modal-title').text('Editer Client');

        $trClient = $(this).closest('tr');

        $(namespace + '#nouveau-client input#nomClient').val($trClient.children().eq(0).text());
        $(namespace + '#nouveau-client input#adresse').val($trClient.children().eq(1).text());
        $(namespace + '#nouveau-client input#contact').val($trClient.children().eq(2).text());

    })

    // enregistrement nouveau client

    $(namespace + '#nouveau-client #btn-enregistrer-client').on('click', function () {

        let nomClient = $(namespace + '#nouveau-client input#nomClient').val();
        let cin = $(namespace + '#nouveau-client input#numCIN').val();
        let adresse = $(namespace + '#nouveau-client input#adresse').val();
        let contact = $(namespace + '#nouveau-client input#contact').val();
        let nif = $(namespace + '#nouveau-client input#nif').val();
        let stat = $(namespace + '#nouveau-client input#stat').val();
        let cif = $(namespace + '#nouveau-client input#cif').val();

        let type = $(namespace + '#nouveau-client').attr('data-value');

        switch (type) {
            case 'nouveau-client' :
                $client = [nomClient, adresse, contact, 0, 0, $('<div class="action-client">\n' +
                    '                <a id="" class="btn-sm btn-info editClient "><i class="uil-pen"></i></a>\n' +
                    '                <a id="" class="btn-sm btn-danger deleteClient "><i class="uil-trash-alt"></i></a>\n' +
                    '              </div>')];

                push_to_table_list(namespace + '#table-client', autoIncrementFromTableTrContent(namespace + '#table-client'), $client);

                createToast('bg-success', 'uil-icon-check', 'Client enregistre', 'Client enregistre avec succes!');

                break;
            case 'editer-client' :

                $trClient.children().eq(0).text(nomClient);
                $trClient.children().eq(1).text(adresse);
                $trClient.children().eq(2).text(contact);

                createToast('bg-success', 'uil-icon-check', 'Modification Client enregistre', 'Modification Client enregistre avec succes!');

                break;
        }


        $(namespace + '#nouveau-client input').val('');
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

        create_confirm_dialog('Suppression Client', 'Voulez vous vraiment supprimer ce client (id : ' + $trClient.attr("id") + ') ?', $idModalDelete, 'Oui,supprimer', 'btn-danger')
            .on('click', function () {

                $trClient.remove();

                createToast('bg-danger', 'uil-trash-alt', 'Suppression fait', 'Le client est supprime avec success!');

                hideAndRemove('#' + $idModalDelete);

                $(namespace + "#info-credit").removeClass("show")
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