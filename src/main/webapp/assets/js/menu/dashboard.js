$(function () {

    let namespace = "#dashboard ";

    /*

    DASHBOARD

     */

    $lesDettesClients = [
        {
            idClient: "Cl-001",
            nomClient: "Rakoto",
            adresse: "Toamasina",
            contact: "+261 34 12 000 00",
            detteImpaye: 5000
        },
        {
            idClient: "Cl-002",
            nomClient: "Lita",
            adresse: "Fianarantsoa",
            contact: "+261 34 45 000 00",
            detteImpaye: 78000
        },
        {
            idClient: "Cl-003",
            nomClient: "Rabe",
            adresse: "Antananarivo",
            contact: "+261 34 44 000 00",
            detteImpaye: 7500
        },
        {
            idClient: "Cl-004",
            nomClient: "Boto",
            adresse: "Mahajanga",
            contact: "+261 34 75 000 00",
            detteImpaye: 50000
        },
        {
            idClient: "Cl-005", nomClient: "Soa", adresse: "Toamasina", contact: "+261 34 25 000 00", detteImpaye: 15000
        },
        {
            idClient: "Cl-006", nomClient: "Koto", adresse: "Toamasina", contact: "+261 34 14 000 00", detteImpaye: 2500
        }
    ];

    $lesDettesFournisseur = [
        {
            idFournisseur: "Frs-001",
            nomFournisseur: "Entreprise Rakoto",
            adresse: "Toamasina",
            contact: "+261 44 00 000 00",
            detteImpaye: 1500
        },
        {
            idFournisseur: "Frs-002",
            nomFournisseur: "Entreprise Lita",
            adresse: "Antananarivo",
            contact: "+261 44 00 000 00",
            detteImpaye: 75000
        },
        {
            idFournisseur: "Frs-003",
            nomFournisseur: "Entreprise Rabe",
            adresse: "Toamasina",
            contact: "+261 54 00 000 00",
            detteImpaye: 1000
        },
        {
            idFournisseur: "Frs-004",
            nomFournisseur: "Entreprise Boto",
            adresse: "Mahanjanga",
            contact: "+261 77 00 000 00",
            detteImpaye: 2500
        },
        {
            idFournisseur: "Frs-005",
            nomFournisseur: "Entreprise Soa",
            adresse: "Fianarantsoa",
            contact: "+261 82 00 000 00",
            detteImpaye: 100000
        },
        {
            idFournisseur: "Frs-006",
            nomFournisseur: "Entreprise Koto",
            adresse: "Toliara",
            contact: "+261 34 00 000 00",
            detteImpaye: 12000
        }
    ];

    $.each($lesDettesClients, function (key, value) {
        push_to_table_list(namespace + ".table-liste-dette-client", value.idClient, [value.nomClient, value.detteImpaye + " Ar"]);
    })
    $.each($lesDettesFournisseur, function (key, value) {
        push_to_table_list(namespace + ".table-liste-dette-fournisseur", value.idFournisseur, [value.nomFournisseur, value.detteImpaye + " Ar"])
    })

    // event click client tr CLIENT

    $(document).on('dblclick', namespace + '.table-liste-dette-client tbody tr', function () {
        let userId = $(this).attr('id');
        $user = null;

        // check client in array obbject
        $.each($lesDettesClients, function (key, value) {
            if (value.idClient === userId) $user = value;
        })

        // affect all values to label infoCLient

        $('#modal-dette-client .label-nom-client').text($user.nomClient)
        $('#modal-dette-client .label-contact-client').text($user.contact)
        $('#modal-dette-client .label-adresse-client').text($user.adresse)
        $('#modal-dette-client .label-dette-impaye').text($user.detteImpaye)
        $('#modal-dette-client .input-dette-edit').val($user.detteImpaye)

        $('#modal-dette-client').modal('show');
    })

    // event click client tr FOURNISSEUR

    $(document).on('dblclick', namespace + '.table-liste-dette-fournisseur tbody tr', function () {
        let frsId = $(this).attr('id');
        $frs = null;

        // check client in array obbject
        $.each($lesDettesFournisseur, function (key, value) {
            if (value.idFournisseur === frsId) $frs = value;
        })

        // affect all values to label infoCLient

        $('#modal-dette-fournisseur .label-nom-fournisseur').text($frs.nomFournisseur)
        $('#modal-dette-fournisseur .label-contact-fournisseur').text($frs.contact)
        $('#modal-dette-fournisseur .label-adresse-fournisseur').text($frs.adresse)
        $('#modal-dette-fournisseur .label-dette-impaye').text($frs.detteImpaye)
        $('#modal-dette-fournisseur .input-dette-edit').val($frs.detteImpaye)

        $('#modal-dette-fournisseur').modal('show');
    })


    // event payer dette CLIENT

    $('#modal-dette-client #btn-payer-credit-client').on('click', function () {
        $sommeAPayer = $('#modal-dette-client .input-dette-edit').val();
        $modalId = "payement-credit";

        create_confirm_dialog('Confirmation payement', 'Voulez vous vraiment payer le dette de ' + $user.nomClient + ' ? <li>Somme : ' + $sommeAPayer + '</li>', $modalId, 'Oui, payer', 'btn-success')
            .on('click', function () {
                // notification
                createToast('bg-success', 'uil-check-sign', 'Payement Fait', 'Votre payement est bien effectu&eacute;.')

                hideAndRemove('#' + $modalId)

                // insert to table history
                $resteAPayer = parseFloat($('#modal-dette-client .label-dette-impaye').text()) - parseFloat($('#modal-dette-client .input-dette-edit').val());
                push_to_table_list('#modal-dette-client #table-historique-operation-client', '', [new Date().toLocaleDateString(), '[Credit]', $('#modal-dette-client .label-dette-impaye').text(), $('#modal-dette-client .input-dette-edit').val(), $resteAPayer, new Date().toLocaleDateString()])

                $('#modal-dette-client .label-dette-impaye').text($resteAPayer);
                $('#modal-dette-client .input-dette-edit').val($resteAPayer);

                // modification des valeurs du table parent.
                $trCLient = $(namespace + '.table-liste-dette-client tr[id="' + $user.idClient + '"]');
                $trCLient.children().eq(1).text($resteAPayer + " Ar");

                /* Update table */
            })

    })

    // event payer dette FOURNISSEUR

    $('#modal-dette-fournisseur #btn-payer-credit-fournisseur').on('click', function () {
        $sommeAPayer = $('#modal-dette-fournisseur .input-dette-edit').val();
        $modalId = "payement-credit-fournisseur";

        create_confirm_dialog('Confirmation payement', 'Voulez vous vraiment rembourser le dette de ' + $frs.nomFournisseur + ' ? <li>Somme : ' + $sommeAPayer + '</li>', $modalId, 'Oui, payer', 'btn-success')
            .on('click', function () {
                // notification
                createToast('bg-success', 'uil-check-sign', 'Payement Fait', 'Votre payement est bien effectu&eacute;.')

                hideAndRemove('#' + $modalId)

                // insert to table history
                $resteAPayer = parseFloat($('#modal-dette-fournisseur .label-dette-impaye').text()) - parseFloat($('#modal-dette-fournisseur .input-dette-edit').val());
                push_to_table_list('#modal-dette-fournisseur #table-historique-operation-fournisseur', '', [new Date().toLocaleDateString(), '[Remboursement]', $('#modal-dette-fournisseur .label-dette-impaye').text(), $('#modal-dette-fournisseur .input-dette-edit').val(), $resteAPayer, new Date().toLocaleDateString()])

                $('#modal-dette-fournisseur .label-dette-impaye').text($resteAPayer);
                $('#modal-dette-fournisseur .input-dette-edit').val($resteAPayer);

                // modification des valeurs du table parent.
                $trFournisseur = $(namespace + '.table-liste-dette-fournisseur tr[id="' + $frs.idFournisseur + '"]');
                $trFournisseur.children().eq(1).text($resteAPayer + " Ar");

                /* Update table */
            })

    })


    // block client event

    $('#modal-dette-client #btn-bloquer-client, #btn-debloquer-client').on('click', function () {
        $modalId = 'confirmation-blocage';
        create_confirm_dialog($(this).text(), 'Voulez vous vraiment ' + $(this).text() + '?',$modalId,'Oui, ' + $(this).text(), $(this).attr('class'))
            .on('click', function() {

                $('#modal-dette-client #btn-bloquer-client').toggleClass('d-none')
                $('#modal-dette-client #btn-debloquer-client').toggleClass('d-none')

                hideAndRemove('#' + $modalId);

                createToast()
            })


    })

    // block fournisseur event

    $('#modal-dette-fournisseur #btn-bloquer-fournisseur, #btn-debloquer-fournisseur').on('click', function () {
        $modalId = 'confirmation-blocage';
        create_confirm_dialog($(this).text(), 'Voulez vous vraiment ' + $(this).text() + '?',$modalId,'Oui, ' + $(this).text(), $(this).attr('class'))
            .on('click', function() {

                $('#modal-dette-fournisseur #btn-bloquer-fournisseur').toggleClass('d-none')
                $('#modal-dette-fournisseur #btn-debloquer-fournisseur').toggleClass('d-none')

                hideAndRemove('#' + $modalId);
            })


    })


})