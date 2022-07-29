$(function () {
    /*

    NEW EMBARQUEMENT

     */

    let namespace = "#nouveau-embarquement ";

    /*------------------------------------------------------------------------------
                                           SELECTER ARTICLE
    -------------------------------------------------------------------------------*/

    $(document).on('dblclick', namespace + '#table-liste-article tbody tr', function () {
        get_select_affect_to_input(namespace + '#designation-article', $(this).children().eq(0).text(), $(this).children().eq(1).text());
        $(namespace + '#modal-liste-article').modal('hide');
        set_select_option_value([['0', $(this).children().eq(2).text()]], namespace + "#select-unite-article");
        get_select_affect_to_input(namespace + "#input-prix-vente-article", "", $(this).children().eq(5).text())
        get_select_affect_to_input(namespace + "#input-prix-achat-article", "", $(this).children().eq(5).text())
        // après selection article, select * unite de l'article
        // ainsi que son prix
    })


    /*------------------------------------------------------------------------------
        AJOUT DUN ARTICLE
    -------------------------------------------------------------------------------*/

    $('.btn-ajouter-article').on('click', function () {

        $id = $(namespace + '#designation-article').attr('value-id');
        $designation = $(namespace + '#designation-article').val();
        $unite = $(namespace + '#select-unite-article option:selected').text();
        $quantite = $(namespace + '#input-quantite-article').val();
        $prix_achat_article = $(namespace + '#input-prix-achat-article').val();
        $prix_vente_article = $(namespace + '#input-prix-vente-article').val();
        const POIDS_ARTICLE = 1;
        $poids = POIDS_ARTICLE * parseInt($quantite);

        $article_embarquement = [$designation, $unite, $quantite, $poids];

        push_to_table_list(namespace + '#table-liste-article-embarquement', $id, $article_embarquement);

        // vider form vente

        $('.form-vente input').each(function () {
            if ($(this).attr('id') != 'name-client') $(this).attr('value', '');
            if ($(this).attr('type') === 'number') $(this).val(0);
        });

        // vide option

        $(namespace + "#input-unite-article option").remove();

    })

    /*

    QUANTITE POIDS CALCUL

    */

    $(namespace + '#input-quantite-article').on('change', function () {

        let default_poids = 1.01;
        $poids = default_poids * parseInt($(this).val());
        $(namespace + '.label-poids-article').text($poids)

    })

    /*------------------------------------------------------------------------------
                                            SUPPRESSION D'UN ARTICLE
     -------------------------------------------------------------------------------*/

    $(namespace + '#table-liste-article-embarquement tbody tr').on('dblclick', function () {

        $(this).remove();

    })

    // enregistrement du vente

    $sommeVente = 0;
    $countArticle = 0;

    $content = '' +
        'Voulez vous vraiment enregistrer ce vente? <br><br>' +
        '<li>Nombre d\'article : <strong>' + $countArticle + '</strong></li>' +
        '<li>Somme : <strong>' + $sommeVente + ' Ar</strong></li>' +
        '';

    $(namespace + '.form-embarquement .btn-enregistrer-embarquement').on('click', function () {
        $modalId = 'confirmation-embarquement';

        create_confirm_dialog('Confirmation d-embarquement', $content, $modalId, 'Enregistrer', 'btn-primary')
            .on('click', function () { // button de validation

                /*

                 requete d'insertion embarquement

                 */

                // vider table

                $(namespace + '#table-liste-article-embarquement tbody tr').remove();

                $(namespace + '#' + $modalId).modal('hide');

                createToast('bg-success', 'uil-file-check-alt', 'Vente Fait', 'Vente enregistr&eacute; avec succ&egrave;s!')
            })
    })


    /*--------------------------------------------

                        TRANSPORT

     --------------------------------------------*/

    /*
     Nouveau materiel de transport
     */

    $(namespace + "#btn-nouveau-moyen-de-transport").on('click', function () {

        $(namespace + "#nouveau-materiel-de-transport").modal('show')

    })

    /*
     Click button enregistrer materiel de transport
     */

    $(namespace + "#btn-enregistrer-materiel-de-transport").on('click', function () {

        $reference = $(namespace + '#reference').val();
        $typeMateriel = $(namespace + '#type-materiel').val();

        $materielTransport = {};
        $materielTransport.reference = $reference;
        $materielTransport.typeMateriel = $typeMateriel;

        enregistrerMaterielTransport($materielTransport);

    })

    // Enregistrement materiel de transport

    function enregistrerMaterielTransport($object) {

        let materieltransportURL = 'http://localhost:8080/api/v1/materieltransport';
        let jsonData = $object
        $.ajax({
            type: 'POST',
            url: materieltransportURL,
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (data) {
                //reset the input
                $(namespace + '#nouveau-materiel-de-transport input').val('');
                set_select_option_value([[data.id, data.typeMateriel]], namespace + '#input-moyen-de-transport');
                $(namespace + '#input-moyen-de-transport').val(data.id).change();
            }
        });
    }


    /*------------------------------------------

                    FOURNISSEUR

    --------------------------------------------*/

    // Nouveau Fournisseur

    $(namespace + "#btn-nouveau-fournisseur").on('click', function () {

        $(namespace + "#nouveau-fournisseur").modal('show')

    })

    // Click button enregistrer fournisseur

    $(namespace + "#btn-enregistrer-fournisseur").on('click', function () {

        $nom = $(namespace + '#nom').val();
        $adresse = $(namespace + '#adresse').val();
        $contact = $(namespace + '#contact').val();

        $fournisseur = {};
        $fournisseur.nom = $nom;
        $fournisseur.adresse = $adresse;
        $fournisseur.numTel = $contact;
        $fournisseur.type = 1;

        enregistrerClientOuFournisseur($fournisseur);
    })

    /*
     Enregistrement materiel de transport
     */

    function enregistrerClientOuFournisseur($object) {

        let clientOuFournisseurURL = 'http://localhost:8080/api/v1/externalEntities';
        let jsonData = $object
        $.ajax({
            type: 'POST',
            url: clientOuFournisseurURL,
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (data) {
                //reset the input
                $(namespace + '#nouveau-fournisseur input').val('');
                set_select_option_value([[data.id, data.nom]], namespace + '#select-fournisseur');
                $(namespace + '#select-fournisseur').val(data.id).change();
            }
        });
    }


})