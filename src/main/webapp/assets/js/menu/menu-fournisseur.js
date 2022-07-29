$(function () {

    let namespace = "#menu-fournisseur ";
    let cfUrl = "http://localhost:8080/api/v1/externalEntities";
    let idCf = 1;
    let NOUVEAU_FOURNISSEUR = true;


    exportToExcel(namespace + '.btn-export-to-excel','fournisseurs', namespace + '#table-fournisseur')

    // fermer l'info listes article facture

    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })

    // nouveau fournisseur

    $(namespace + '.btn-nouveau-fournisseur').on('click', function () {
        $(namespace + '#nouveau-fournisseur').attr('data-value', 'nouveau-fournisseur');
        $(namespace + '#nouveau-fournisseur').modal('show')

        $(namespace + '#nouveau-fournisseur .modal-title').text('Nouveau Fournisseur');
    })

    // editer fournisseur

    $(document).on('click', namespace + '.editFournisseur', function () {
        $(namespace + '#nouveau-fournisseur').attr('data-value', 'editer-fournisseur');
        $(namespace + '#nouveau-fournisseur').modal('show')

        $(namespace + '#nouveau-fournisseur .modal-title').text('Editer Fournisseur');
        $trFournisseur = $(this).closest('tr');
        idCf = $trFournisseur.attr("id");
        $(namespace + '#nouveau-fournisseur input#nom').val($trFournisseur.children().eq(0).text());
        $(namespace + '#nouveau-fournisseur input#adresse').val($trFournisseur.children().eq(1).text());
        $(namespace + '#nouveau-fournisseur input#contact').val($trFournisseur.children().eq(2).text());

        NOUVEAU_FOURNISSEUR = false;
    })

    function enregistrerClientOuFournisseur(fournisseur){
        let cfResourceUrl = NOUVEAU_FOURNISSEUR ? cfUrl :cfUrl+"/"+idCf;
        let methodType = NOUVEAU_FOURNISSEUR ? "POST" : "PUT";
        $.ajax({
            type: methodType,
            url: cfResourceUrl,
            contentType: 'application/json',
            data: JSON.stringify(fournisseur),
            success: function (data){
                if (NOUVEAU_FOURNISSEUR){
                    $fournisseur = [data.nom,data.adresse,data.numTel,0, $('<div class="action-fournisseur">\n' +
                        '                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>\n' +
                        '                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>\n' +
                        '              </div>')];
                    push_to_table_list(namespace + '#table-fournisseur',data.id, $fournisseur);
                    createToast('bg-success', 'uil-icon-check', 'Fournisseur enregistre', 'Fournisseur enregistre avec succes!');
                }else {
                    $trFournisseur.children().eq(0).text(fournisseur.nom);
                    $trFournisseur.children().eq(1).text(fournisseur.adresse);
                    $trFournisseur.children().eq(2).text(fournisseur.numTel);

                    createToast('bg-success', 'uil-icon-check', 'Modification Fournisseur enregistre', 'Modification Fournisseur enregistre avec succes!');
                }
                $(namespace + '#nouveau-fournisseur input').val('');
                NOUVEAU_FOURNISSEUR = true;
            }
        });
    }

    // enregistrement nouveau fournisseur
    $(namespace + '#nouveau-fournisseur #btn-enregistrer-fournisseur').on('click', function () {
        let nomFournisseur = $(namespace + '#nouveau-fournisseur input#nom').val();
        let adresse = $(namespace + '#nouveau-fournisseur input#adresse').val();
        let contact = $(namespace + '#nouveau-fournisseur input#contact').val();
        let fr = {};
        fr.nom = nomFournisseur;
        fr.adresse = adresse;
        fr.numTel = contact;
        fr.type = 1;
        enregistrerClientOuFournisseur(fr)
    })
    // click fournisseur tr
    $(document).on('click', namespace + '#table-fournisseur tbody tr', function () {
        // get reference of selected facture
        $trFournisseur = $(this);
        $(namespace + "#info-credit").addClass("show")
    })

    // suppression fournisseur

    $(document).on('click', namespace + '#table-fournisseur .deleteFournisseur', function () {
        $trFournisseur = $(this).closest('tr');
        $idModalDelete = "suppression-fournisseur";
        create_confirm_dialog('Suppression Fournisseur', 'Voulez vous vraiment supprimer ce fournisseur (id : ' + $trFournisseur.attr("id") + ') ?', $idModalDelete, 'Oui,supprimer', 'btn-danger')
            .on('click', function () {

                $trFournisseur.remove();

                createToast('bg-danger', 'uil-trash-alt', 'Suppression fait', 'Le fournisseur est supprime avec success!');

                hideAndRemove('#' + $idModalDelete);

                $(namespace + "#info-credit").removeClass("show")
            })
    })

    /*

    NOUVEAU DETTE

     */

    $(namespace + '.btn-nouveau-dette').on('click', function() {
        $(namespace + '#nouveau-dette input#nomFournisseur').val($trFournisseur.children().eq(0).text())
    })

    $(namespace + '#nouveau-dette #btn-enregistrer-dette-fournisseur').on('click', function () {

        $montant = $(namespace + '#nouveau-dette input#somme').val();
        $description = $(namespace + '#nouveau-dette textarea#description').val();

        $dette = ['ref-00000',new Date().toLocaleDateString(), $montant, 0, $montant, $description];

        push_to_table_list(namespace + '.table-dette-fournisseur', '', $dette);

        createToast('bg-success', 'uil-check-sign', 'Dette enregistre', 'Nouveau dette enregistre avec success!');

        $(namespace + '#nouveau-dette input').val('');
        $(namespace + '#nouveau-dette textarea').val('');
    })

    /*
    SUpprimer dette
     */

    $(namespace + '.btn-supprimer-dette').on('click', function () {
        $modalId = "suppression-dette-fournisseur"

        create_confirm_dialog('Suppression dette', 'Voulez vraiment supprimer les dettes impayes ?', $modalId, 'Oui, supprimer tout', 'btn-danger')
            .on('click', function() {
                $(namespace + '.table-dette-fournisseur tbody tr').remove();
                hideAndRemove('#' + $modalId);
                createToast('bg-danger', 'uil-check-sign', 'Dette supprime', 'Tout les dettes fournisseur sont supprimer avec success!');
            })
    })
})