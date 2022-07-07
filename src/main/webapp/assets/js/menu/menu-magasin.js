$(function () {
    let namespace = "#menu-magasin ";
    $magasinUrl = "http://localhost:8080/api/v1/magasins";
    /*
    MENU MAGASIN
     */
    // constante
    const NOUVEAU = 'nouveau', EDITION = 'edition';

    // click de bouton nouveau
    $(namespace + '#btn-nouveau-magasin').on('click', function () {
        $(namespace + '#new-magasin').attr('data-type', NOUVEAU);
        $(namespace + '#new-magasin .modal-title').html('Nouveau magasin');
    })

    /*-------------------------------------------------------
    Enregistrement nouveau magasin ou edition d'un magasin
    --------------------------------------------------------- */
    $(namespace + '#btn-enregistrer-magasin').on('click', function () {
        $nomMagasin = $(namespace + '#nom-magasin').val();
        $adresseMagasin = $(namespace + '#adresse-magasin').val();
        $filialeId = 1;
        $newMagasin = {
            adresse : $adresseMagasin,
            nomMagasin : $nomMagasin,
            filiale : {
                id : $filialeId
            }
        };
        $nouveauMagasin = $(namespace + '#new-magasin').attr('data-type') === NOUVEAU;
        $magasinResourcesUrl = $nouveauMagasin ? $magasinUrl :$magasinUrl+"/"+$idMagasin;
        $methodType = $nouveauMagasin ? "POST" : "PUT";
        $.ajax({
            type: $methodType,
            url: $magasinResourcesUrl,
            contentType: 'application/json',
            data: JSON.stringify($newMagasin),
            success: function (data) {
                $newMagasin = data;
                /* ACTION */
                $tdActionContent = $(' ' + '<div class="d-inline-flex justify-content-center">' + '<a href="#" class="delete-magasin"><i class="uil-trash-alt"></i></a>' + '<a href="#" class="edit-magasin"><i class="uil-pen"></i></a>' + '</div>');
                $oneMagasin = [$nomMagasin, $adresseMagasin, $tdActionContent];
                if ($nouveauMagasin) {
                    push_to_table_list("#table-liste-magasin",data.id,$oneMagasin);
                    createToast('bg-success', 'uil-file-check', 'Creation Fait', 'Creation d\'un nouveau magasin effectu&eacute; avec succ&egrave;s!')
                }
                // EDITION MAGASIN OPERATION
                else{
                    console.log(" UPDATE ");
                    update_to_table_list(namespace + '#table-liste-magasin', $(namespace + '#new-magasin').attr('data-id'), $oneMagasin);
                    createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du magasin effectu&eacute; avec succ&egrave;s!')
                }
                $(namespace + '#new-magasin input').val(''); // empty input
                $(namespace + '#new-magasin').modal('hide'); // close modal
            }
        });
    });

    // EDITION MAGASIN ON-CLICK
    $(document).on('click', namespace + 'a.edit-magasin', function () {
        $(namespace + '#new-magasin').modal('show');
        $trContent = $(this).closest('tr');
        $idMagasin = $trContent.attr('id');
        $(namespace + '#new-magasin .modal-title').html('Edition d\'un magasin');
        $(namespace + '#new-magasin input#nom-magasin').val($trContent.children().eq(0).text());
        $(namespace + '#new-magasin input#adresse-magasin').val($trContent.children().eq(1).text());
        $(namespace + '#new-magasin').attr('data-type', EDITION);
        $(namespace + '#new-magasin').attr('data-id', $trContent.attr('id')); // id of current tr element
    })
    // SUPPRESSION MAGASIN ON-CLICK
    $(document).on('click', namespace + 'a.delete-magasin', function () {
        $currentTR = $(this).closest('tr');
        $modalID = 'suppression-modal';
        let idMagasin = $currentTR.attr('id');
        $contentDialog = '' + 'Voulez vous vraiment supprimez ce magasin ??' + '<li>' + $currentTR.children().eq(0).text() + ' (' + $currentTR.children().eq(1).text() + ')</li>';
        create_confirm_dialog('Suppression magasin', $contentDialog, $modalID, 'Oui , Supprimer', 'btn-outline-danger')
            .on('click', function () {
                $.ajax({
                    type: "DELETE",
                    url: $magasinUrl+"/"+idMagasin,
                    contentType: 'application/json',
                    success: function (data) {
                        $currentTR.remove()
                        $('#table-liste-utilisateur-magasin tbody tr').remove();
                        $(namespace + '#' + $modalID + '').modal('hide');
                        $(namespace + '#' + $modalID + '').remove();
                        createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait', 'Suppression du magasin effectu&eacute; avec succ&egrave;s!')
                    }
                    });
            })

    })
    /*
    CLICK MAGASIN EVENT, SHOW ALL USERS OF THIS MAGASIN
     */
    function getAllUserByMagasinId($idMagasin){
        $magasinResourcesUrl = $magasinUrl+"/"+$idMagasin+"/users";
        $.ajax({
            type: "GET",
            url: $magasinResourcesUrl,
            contentType: 'application/json',
            success : function (data) {
                for (let i = 0; i < data.length; i++) {
                    $userInfo = data[i].split(",");
                    push_to_table_list_magasin($userInfo);
                }
            }
        });
    }
    $(document).on('click', namespace + '#table-liste-magasin tbody tr', function () {
        // Charger les listes d'utilisateur de ce magasin
        $idMagasin = $(this).attr('id');
        // Supprimer toutes les elements dans la table
        $(namespace + '#table-liste-utilisateur-magasin tbody tr').remove();
        // affichage des utilisateur
        getAllUserByMagasinId($idMagasin);
    })
})