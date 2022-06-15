$(function () {
    /*
    MENU MAGASIN
     */

    // constante

    const NOUVEAU = 'nouveau', EDITION = 'edition';

    // Chargement des données du magasin

    $listUtilisateur = [{
        nomUtilisateur: 'Rakoto', fonctionUtilisateur: "Administrateur", magasin: "1"
    }, {
        nomUtilisateur: 'Rabe', fonctionUtilisateur: "Caissier", magasin: "1"
    }, {
        nomUtilisateur: 'Lita', fonctionUtilisateur: "Vendeuse", magasin: "2"
    }, {
        nomUtilisateur: 'Keta', fonctionUtilisateur: "Caissière", magasin: "3"
    }, {
        nomUtilisateur: 'Koto', fonctionUtilisateur: "Controlleur", magasin: "3"
    }, {
        nomUtilisateur: 'Leba', fonctionUtilisateur: "Administrateur", magasin: "3"
    }, {
        nomUtilisateur: 'Bema', fonctionUtilisateur: "Controlleur", magasin: "1"
    }]

    // click de bouton nouveau

    $('#btn-nouveau-magasin').on('click', function () {
        $('#new-magasin').attr('data-type', NOUVEAU);
        $('#new-magasin .modal-title').html('Nouveau magasin');
    })

    /*-------------------------------------------------------
    Enregistrement nouveau magasin ou edition d'un magasin
    --------------------------------------------------------- */

    $('#btn-enregistrer-magasin').on('click', function () {

        $nomMagasin = $('#nom-magasin').val();
        $adresseMagasin = $('#adresse-magasin').val();

        /* ACTION */
        $tdActionContent = $(' ' + '<div class="d-inline-flex justify-content-center">' + '<a href="#" class="delete-magasin"><i class="uil-trash-alt"></i></a>' + '<a href="#" class="edit-magasin"><i class="uil-pen"></i></a>' + '</div>');

        $oneMagasin = [$nomMagasin, $adresseMagasin, $tdActionContent];

        // NOUVEAU MAGASIN OPERATION

        if ($('#new-magasin').attr('data-type') === NOUVEAU) {
            $id = autoIncrementFromTableTrContent("#table-liste-magasin");
            push_to_table_list("#table-liste-magasin", $id, $oneMagasin);
            createToast('bg-success', 'uil-file-check', 'Creation Fait', 'Creation d\'un nouveau magasin effectu&eacute; avec succ&egrave;s!')
        }

        // EDITION MAGASIN OPERATION

        else if ($('#new-magasin').attr('data-type') === EDITION) {
            console.log('ici edition')
            update_to_table_list('#table-liste-magasin', $('#new-magasin').attr('data-id'), $oneMagasin);
            createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du magasin effectu&eacute; avec succ&egrave;s!')
        }

        $('#new-magasin input').val(''); // empty input
        $('#new-magasin').modal('hide'); // close modal
    })

    // EDITION MAGASIN ON-CLICK

    $(document).on('click', 'a.edit-magasin', function () {
        $('#new-magasin').modal('show');
        $trContent = $(this).closest('tr');

        $('#new-magasin .modal-title').html('Edition d\'un magasin');
        $('#new-magasin input#nom-magasin').val($trContent.children().eq(0).text());
        $('#new-magasin input#adresse-magasin').val($trContent.children().eq(1).text());

        $('#new-magasin').attr('data-type', EDITION);
        $('#new-magasin').attr('data-id', $trContent.attr('id')); // id of current tr element
    })

    // SUPPRESSION MAGASIN ON-CLICK

    $(document).on('click', 'a.delete-magasin', function () {
        $currentTR = $(this).closest('tr');
        $modalID = 'suppression-modal'
        $contentDialog = '' + 'Voulez vous vraiment supprimez ce magasin ??' + '<li>' + $currentTR.children().eq(0).text() + ' (' + $currentTR.children().eq(1).text() + ')</li>';

        create_confirm_dialog('Suppression magasin', $contentDialog, $modalID, 'Oui, Supprimer', 'btn-outline-danger')
            .on('click', function () {
                $currentTR.remove()

                $('#' + $modalID + '').modal('hide');
                $('#' + $modalID + '').remove();

                createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait', 'Suppression du magasin effectu&eacute; avec succ&egrave;s!')
            })

    })

    /*

    CLICK MAGASIN EVENT, SHOW ALL USERS OF THIS MAGASIN

     */

    $(document).on('click', '#table-liste-magasin tbody tr', function () {
        // Charger les listes d'utilisateur de ce magasin
        $idMagasin = $(this).attr('id');

        $('#table-liste-utilisateur-magasin tbody tr').remove();

        $.each($listUtilisateur, function (key, value) {
            if (value.magasin === $idMagasin) {
                $magasinModel = [value.nomUtilisateur, value.fonctionUtilisateur];
                push_to_table_list('#table-liste-utilisateur-magasin', key, $magasinModel);
            }
        })

    })

})