$(function () {
    $fonctionUrl = "http://localhost:8080/api/v1/fonctions";
    $userUrl = "http://localhost:8080/api/v1/users";
    $NEW_USER = true;
        /*--------------------------------------------------------------------------
                               MENU UTILISATEUR
        ------------------------------------------------------------------------- */
    let namespace = "#menu-utilisateur "
    /*----------------------------------------------------------------------------
                        NOUVELLE FONCTION
    ------------------------------------------------------------------------ */

    exportToExcel('utilisateurs', namespace + '#table-liste-utilisateur')

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
        $isNew = dataValue === NEW;
        $fonctionResourcesUrl = $isNew ? $fonctionUrl :$fonctionUrl+"/"+$idfonction;
        $methodType = $isNew ? "POST" : "PUT";
        $nouveauFonction = {
            nomFonction : libelle
        }
        $.ajax({
            type: $methodType,
            url: $fonctionResourcesUrl,
            contentType: 'application/json',
            data: JSON.stringify($nouveauFonction),
            success: function (data){
                if ($isNew){
                    $td = [libelle, $actionNouvelleFonctionMenuUtilisateur]
                    push_to_table_list(namespace + '#table-liste-fonction',data.id,$td);
                    createToast('bg-success', 'uil-check-sign', 'Enregistement Fait', 'Nouvelle fonction enregistre avec success!')
                }else{
                    $trEdit.children().eq(0).text(libelle)
                    createToast('bg-success', 'uil-check-sign', 'Modification fait', 'Modification du fonction fait!')
                }
                $(namespace + '#nouvelle-fonction input#libelle-fonction').val('')
                load_select_fonction()
            }
        });
    })
    // editer fonction, click
    $(document).on('click', namespace + '.edit-fonction', function () {
        $trEdit = $(this).closest('tr');
        $idfonction = $trEdit.attr('id');
        $(namespace + '#nouvelle-fonction').modal('show');
        $(namespace + '#nouvelle-fonction').attr('data-value', EDIT);
        $(namespace + '#nouvelle-fonction .modal-title').text('Editer Fonction');
        $(namespace + '#nouvelle-fonction input#libelle-fonction').val($trEdit.children().eq(0).text());
    })
    // supprimer foonction, click
    $(document).on('click', namespace + '.delete-fonction', function () {
        $trDelete = $(this).closest('tr')
        $modalId = 'suppression-fonction'
        $idfonction = $trDelete.attr('id');
        create_confirm_dialog('Suppression Fonction', 'Voulez vous vraiment supprimer cette fonction ?<li>' + $trDelete.children().eq(0).text() + '</li>', $modalId, 'Oui, supprimer!', 'btn-danger')
            .on('click', function () {
                $.ajax({
                    type: "DELETE",
                    url: $fonctionUrl+"/"+$idfonction,
                    contentType: 'application/json',
                    success: function (data){
                        $trDelete.remove();
                        hideAndRemove(namespace + '#' + $modalId)
                        load_select_fonction()
                        createToast('bg-danger', 'uil-trash-alt', 'Suppression fait!', 'Fonction supprime avec success!')
                    }
                });
            })
    })
    /*----------------------------------------------------------------------
                         NOUVEAU UTILISATEUR
     ----------------------------------------------------------------------*/
    function load_select_fonction() {
        $(namespace + '#nouveau-utilisateur #select-fonction option').remove();
        $(namespace + '#table-liste-fonction tbody tr').each(function(index, tr) {
            push_select_option_value([$(tr).attr('id'), $(tr).children().eq(0).text()], namespace + '#nouveau-utilisateur #select-fonction')
        })
    }
    // nouveau utilisateur
    $(namespace + "#btn-nouveau-utilisateur").on('click', function () {
        // $url = "http://localhost:8080/api/v1/magasins";
        // $.ajax({
        //     type: "GET",
        //     url: $url,
        //     contentType: 'application/json',
        //     success : function (data) {
        //         set_select_option_value_ajax(data, namespace + "#nouveau-utilisateur #select-magasin")
        //     }
        // });
    })
    load_select_fonction();
    // enregistrement d'un nouveau utilisateur
    let magasinIdTab = [];
    $(namespace + "#nouveau-utilisateur #btn-enregistrer-utilisateur").on('click', function() {
        $nom = $(namespace + "#nouveau-utilisateur #input-nom").val();
        $adresse = $(namespace + "#nouveau-utilisateur #input-adresse").val();
        $contact = $(namespace + "#nouveau-utilisateur #input-contact").val();
        $username = $(namespace + "#nouveau-utilisateur #input-username").val();
        $password = $(namespace + "#nouveau-utilisateur #input-password").val();
        $(namespace + "#nouveau-utilisateur #select-magasin option:selected").each(function (key,value){
            magasinIdTab.push({ id : $(value).val()});
        });
        console.log(magasinIdTab);
        $fonctionId = $(namespace + "#nouveau-utilisateur #select-fonction option:selected").val();
        $fonctionNom = $(namespace + "#nouveau-utilisateur #select-fonction option:selected").text();
        $statut = $(namespace + "#nouveau-utilisateur #check-statut").is(':checked')
        $newUser = {
            nom : $nom,
            adresse : $adresse,
            numTel : $contact,
            username : $username,
            password : $password,
            enabled : $statut,
            fonction : {
                id : $fonctionId
            },
            magasin : magasinIdTab
        }
        $.ajax({
            type: "POST",
            url: $userUrl,
            contentType: 'application/json',
            data: JSON.stringify($newUser),
            success: function (data){
                if ($NEW_USER){
                    $trUser = [$nom,$username,$contact,$fonctionNom,$statut === true ? insert_badge('success', 'active') : insert_badge('danger', 'desactive'), $actionListeUtilisateurMenuUtilisatuer];
                    push_to_table_list(namespace + "#table-liste-utilisateur",data.id, $trUser)
                    createToast('bg-success', 'uil-check-sign', 'Utilisateur enregistre', 'Nouveau utilisateur enregistre avec success!')
                    // empty all
                    $(namespace + "#nouveau-utilisateur input").val("");
                    $('#nouveau-utilisateur select#select-fonction option:first').prop('selected', true);
                    $('#nouveau-utilisateur select#select-magasin option:first').prop('selected', true);
                    $('#nouveau-utilisateur #check-statut').prop('checked', true)
                }else {

                }
            }
        });
    })
    // suppression utilisateur
    $(document).on('click', namespace + "#table-liste-utilisateur .delete-utilisateur", function(){
        $trUtilisateur = $(this).closest('tr');
        $userId = $trUtilisateur.attr("id");
        let nomEtPrenoms = $trUtilisateur.children().eq(1).text();
        $modalId = 'supprimer-utilisateur';
        create_confirm_dialog('Suppression Utilisateur', 'Voulez vraiment supprimer cet utilisateur ? <li>' + nomEtPrenoms + '</li>', $modalId, 'Oui, supprimer', 'btn-danger')
            .on('click', function() {
                $methodType = "DELETE"
                // SUPPRIMER
                $.ajax({
                    type: $methodType,
                    url: $userUrl+"/"+$userId,
                    contentType: 'application/json',
                    success: function (data){
                        $trUtilisateur.remove();
                        hideAndRemove(namespace + '#' + $modalId);
                        createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait!', 'Utilisateur supprime avec success!');
                    }
                });
            })
    })
    // MODIFIER UTILISATEUR
    $(document).on('click', namespace + "#table-liste-utilisateur .edit-utilisateur",function(){
        $NEW_USER  = false;
        $trEdit = $(this).closest('tr');
        $(namespace + '#nouveau-utilisateur').modal('show');
    });
    // on click function for filter
    $(document).on('click', namespace + '#table-liste-fonction tbody tr' ,function() {
        filterFunctionEvent($(this).children().eq(0).text());
    })

    function filterFunctionEvent($dataFilter) {
        $(namespace + '#table-liste-utilisateur tbody tr').hide();
        if ($dataFilter === null) $(namespace + '#table-liste-utilisateur tbody tr').show();

        else
            $(namespace + '#table-liste-utilisateur tbody tr').each(function(key, value) {
                if ($(value).children('.function-user').text() === $dataFilter) $(value).show();
            })
    }
    // filter all
    $(namespace + '.function-filter-all').on('click', function() {
        filterFunctionEvent(null)
    })
})