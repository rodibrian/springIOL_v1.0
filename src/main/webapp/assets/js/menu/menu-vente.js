$(function () {
    /* -------------------------------------------------------------------------------
                                       MENU VENTE SCRIPT
    -------------------------------------------------------------------------------- */

    /*-------------------------------------------------------------------------------
                                            LOADING...
    -------------------------------------------------------------------------------- */

    let namespace = "#menu-vente ";

    // Chargement de magasin

    $(function () {
        $magasin_listes = [['id-I', 'Magasin I'], ['id-II', 'Magasin II'], ['id-III', 'Magasin III']];
        set_select_option_value($magasin_listes, namespace + '#select-magasin')
    })

    /*------------------------------------------------------------------------------
                                            OPERATION
     -------------------------------------------------------------------------------*/

    // Selecter client

    $(namespace + '#table-liste-client tbody tr').on('dblclick', function () {
        get_select_affect_to_input(namespace + '#name-client', $(this).attr('id'), $(this).children().eq(0).text());
        $(namespace + '#modal-liste-client').modal('hide');
    })

    // Selecter article

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {
        get_select_affect_to_input(namespace + '#designation-article', $(this).children().eq(0).text(), $(this).children().eq(1).text());
        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
        // ainsi que son prix
    })

    // prix spécial d'un article

    $(namespace + '#modal-prix-special .btn-enregistrer-modal').on('click', function () {

        $isRemise = $(namespace + '#check-prix-special-remise').is(':checked');
        $current_price = $(namespace + '#input-prix-unitaire').val();
        $special_value = $(namespace + '#input-prix-special').val();

        $special_price_final = $isRemise ? $current_price - $current_price * ($special_value / 100) : $special_value;

        get_select_affect_to_input(namespace + '#input-prix-unitaire', null, $special_price_final);

        $(namespace + '#modal-prix-special').modal('hide')
    })

    // ajout d'un article

    $('.btn-ajouter-article-vente').on('click', function () {
        $id = $(namespace + '#designation-article').attr('value-id');
        $designation = $(namespace + '#designation-article').val();
        $unite = $(namespace + '#input-unite-article option:selected').text();
        $quantite = $(namespace + '#input-quantite-article').val();
        $prix_unitaire = $(namespace + '#input-prix-unitaire').val();
        $montant = $quantite * $prix_unitaire;

        $article_vente = [$designation, $unite, $quantite, $prix_unitaire, $montant];

        push_to_table_list(namespace + '#table-liste-article-vente', $id, $article_vente);

        // vider form vente
        $('.form-vente input').each(function () {
            if ($(this).attr('id') != 'name-client') $(this).val('');
        });
    })

    // suppression article

    $(namespace + '#table-liste-article-vente tbody tr').on('dblclick', function () {
        $(this).remove();
    })

    // enregistrement du vente

    $content = '' +
        'Voulez vous vraiment enregistrer ce vente? <br><br>' +
        '<li>Nombre d\'article : <strong>0</strong></li>' +
        '<li>Somme : <strong>0Ar</strong></li>' +
        '';

    $('.form-vente .btn-enregistrer-vente').on('click', function () {
        $modalId = 'confirmation-de-vente';

        create_confirm_dialog('Confirmation de Vente', $content, $modalId, 'Enregistrer', 'btn-primary')
            .on('click', function () { // button de validation

                /*
                 requete d'insertion vente
                 */

                // vider table
                $(namespace + '#table-liste-article-vente tbody tr').remove();

                $(namespace + '#' + $modalId).modal('hide');

                createToast('bg-success', 'uil-file-check-alt', 'Vente Fait', 'Vente enregistr&eacute; avec succ&egrave;s!')
            })
    })

})