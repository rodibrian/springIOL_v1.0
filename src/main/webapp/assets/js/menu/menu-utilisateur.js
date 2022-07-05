$(function () {
    /*--------------------------------------------------------------------------

                           MENU UTILISATEUR

    ------------------------------------------------------------------------- */

    let namespace = "#menu-utilisateur "


    /*----------------------------------------------------------------------------

                        NOUVELLE FONCTION

    ------------------------------------------------------------------------ */

    let NEW = 'nouveau', EDIT = 'editer';

    $(namespace + '.btn-nouvelle-fonction').on('click', function () {
        $(namespace + '#nouvelle-fonction').modal('show');
        $(namespace + '#nouvelle-fonction').attr('data-value', NEW);
        $(namespace + '#nouvelle-fonction .modal-title').text('Nouvelle Fonction');

        $(namespace + '#nouvelle-fonction input#libelle-fonction').val('')
    })

    // enregistrement du nouvelle fonction

    $(namespace + '#btn-enregistrer-fonction').on('click', function () {
        let libelle = $(namespace + '#nouvelle-fonction input#libelle-fonction').val();
        let dataValue = $(namespace + '#nouvelle-fonction').attr('data-value');

        switch (dataValue) {
            case
            NEW :
                $td = [libelle, $actionNouvelleFonctionMenuUtilisateur]
                push_to_table_list(namespace + '#table-liste-fonction', autoIncrementFromTableTrContent(namespace + '#table-liste-fonction'), $td);
                createToast('bg-success', 'uil-check-sign', 'Enregistement Fait', 'Nouvelle fonction enregistre avec success!')
                break;
            case
            EDIT :
                $trEdit.children().eq(0).text(libelle)
                createToast('bg-success', 'uil-check-sign', 'Modification fait', 'Modification du fonction fait!')
                break;
        }

        $(namespace + '#nouvelle-fonction input#libelle-fonction').val('')
        load_select_fonction()

    })

    // editer fonction, click

    $(document).on('click', namespace + '.edit-fonction', function () {
        $trEdit = $(this).closest('tr')
        $(namespace + '#nouvelle-fonction').modal('show');
        $(namespace + '#nouvelle-fonction').attr('data-value', EDIT);
        $(namespace + '#nouvelle-fonction .modal-title').text('Editer Fonction');

        $(namespace + '#nouvelle-fonction input#libelle-fonction').val($trEdit.children().eq(0).text());
    })

    // supprimer foonction, click

    $(document).on('click', namespace + '.delete-fonction', function () {
        $trDelete = $(this).closest('tr')

        $modalId = 'suppression-fonction'
        create_confirm_dialog('Suppression Fonction', 'Voulez vous vraiment supprimer cette fonction ?<li>' + $trDelete.children().eq(0).text() + '</li>', $modalId, 'Oui, supprimer!', 'btn-danger')
            .on('click', function () {
                $trDelete.remove();

                hideAndRemove(namespace + '#' + $modalId)

                load_select_fonction()

                createToast('bg-danger', 'uil-trash-alt', 'Suppression fait!', 'Fonction supprime avec success!')
            })
    })


    /*----------------------------------------------------------------------

                         NOUVEAU UTILISATEUR

     ----------------------------------------------------------------------*/

    $lesMagasins = [
        {
            id: '1',
            libelle : 'M1'
        },
        {
            id: '2',
            libelle : 'M2'
        }
    ]

    // chargement des données

    set_select_option_value($lesMagasins, namespace + "#nouveau-utilisateur #select-magasin")

    function load_select_fonction() {
        $(namespace + '#nouveau-utilisateur #select-fonction option').remove();
        $(namespace + '#table-liste-fonction tbody tr').each(function(index, tr) {
            push_select_option_value([$(tr).attr('id'), $(tr).children().eq(0).text()], namespace + '#nouveau-utilisateur #select-fonction')
        })
    }

    load_select_fonction();

    // enregistrement d'un nouveau utilisateur

    $(namespace + "#nouveau-utilisateur #btn-enregistrer-utilisateur").on('click', function() {
        let nom = $(namespace + "#nouveau-utilisateur #input-nom").val();
        let prenoms = $(namespace + "#nouveau-utilisateur #input-prenoms").val();
        let adresse = $(namespace + "#nouveau-utilisateur #input-adresse").val();
        let contact = $(namespace + "#nouveau-utilisateur #input-contact").val();
        let username = $(namespace + "#nouveau-utilisateur #input-username").val();
        let password = $(namespace + "#nouveau-utilisateur #input-password").val();
        let magasin = $(namespace + "#nouveau-utilisateur #select-magasin option:selected").text();
        let fonction = $(namespace + "#nouveau-utilisateur #select-fonction option:selected").text();
        let statut = $(namespace + "#nouveau-utilisateur #check-statut").is(':checked')

        $trUser = ['', nom, prenoms, username, contact, fonction, magasin, statut === true ? insert_badge('success', 'active') : insert_badge('danger', 'desactive'), $actionListeUtilisateurMenuUtilisatuer];

        push_to_table_list(namespace + "#table-liste-utilisateur", autoIncrementFromTableTrContent(namespace + "#table-liste-utilisateur"), $trUser)
        createToast('bg-success', 'uil-check-sign', 'Utilisateur enregistre', 'Nouveau utilisateur enregistre avec success!')

        // empty all

        $(namespace + "#nouveau-utilisateur input").val("");
        $('#nouveau-utilisateur select#select-fonction option:first').prop('selected', true);
        $('#nouveau-utilisateur select#select-magasin option:first').prop('selected', true);
        $('#nouveau-utilisateur #check-statut').prop('checked', true)

    })

    // suppression utilisateur

    $(document).on('click', namespace + "#table-liste-utilisateur .delete-utilisateur", function() {
        $trUtilisateur = $(this).closest('tr');
        let nomEtPrenoms = $trUtilisateur.children().eq(1).text() + ' ' + $trUtilisateur.children().eq(2).text();
        $modalId = 'supprimer-utilisateur';

        create_confirm_dialog('Suppression Utilisateur', 'Voulez vraiment supprimer cet utilisateur ? <li>' + nomEtPrenoms + '</li>', $modalId, 'Oui, supprimer', 'btn-danger')
            .on('click', function() {

                $trUtilisateur.remove();

                hideAndRemove(namespace + '#' + $modalId);
                createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait!', 'Utilisateur supprime avec success!');

            })

    })

})