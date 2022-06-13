$(function () {
    /* -------------------------------------------------------------------------------
                                       MENU VENTE SCRIPT
    -------------------------------------------------------------------------------- */

    /*-------------------------------------------------------------------------------
                                            LOADING...
    -------------------------------------------------------------------------------- */

    // Chargement de magasin

    $(function () {
        $magasin_listes = [['id-I', 'Magasin I'], ['id-II', 'Magasin II'], ['id-III', 'Magasin III']];
        set_select_option_value($magasin_listes, '#select-magasin')
    })

    /*------------------------------------------------------------------------------
                                            OPERATION
     -------------------------------------------------------------------------------*/

    // Selecter client

    $('#table-liste-client tbody tr').on('dblclick', function () {
        get_select_affect_to_input('#name-client', $(this).attr('id'), $(this).children().eq(0).text());
        $('#modal-liste-client').modal('hide');
    })

    // Selecter article

    $('#table-liste-article tbody tr').on('dblclick', function () {
        get_select_affect_to_input('#designation-article', $(this).children().eq(0).text(), $(this).children().eq(1).text());
        $('#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
        // ainsi que son prix
    })

    // prix spécial d'un article

    $('#modal-prix-special .btn-enregistrer-modal').on('click', function () {

        $isRemise = $('#check-prix-special-remise').is(':checked');
        $current_price = $('#input-prix-unitaire').val();
        $special_value = $('#input-prix-special').val();

        $special_price_final = $isRemise ? $current_price - $current_price * ($special_value / 100) : $special_value;

        get_select_affect_to_input('#input-prix-unitaire', null, $special_price_final);

        $('#modal-prix-special').modal('hide')
    })

    // ajout d'un article

    $('.btn-ajouter-article-vente').on('click', function () {
        $id = $('#designation-article').attr('value-id');
        $designation = $('#designation-article').val();
        $unite = $('#input-unite-article option:selected').text();
        $quantite = $('#input-quantite-article').val();
        $prix_unitaire = $('#input-prix-unitaire').val();
        $montant = $quantite * $prix_unitaire;

        $article_vente = [$designation, $unite, $quantite, $prix_unitaire, $montant];

        push_to_table_list('#table-liste-article-vente', $id, $article_vente);

        // vider form vente
        $('.form-vente input').each(function () {
            if ($(this).attr('id') != 'name-client') $(this).val('');
        });
    })

    // suppression article

    $('#table-liste-article-vente tbody tr').on('dblclick', function() {
        $(this).remove();
    })

    // enregistrement du vente

    $content = '' +
        'Voulez vous vraiment enregistrer ce vente? <br><br>' +
        '<li>Nombre d\'article : <strong>0</strong></li>' +
        '<li>Somme : <strong>0Ar</strong></li>' +
        '';

    $('.form-vente .btn-enregistrer-vente').on('click', function() {
        $modalId = 'confirmation-de-vente';

        create_confirm_dialog('Confirmation de Vente', $content, $modalId, 'Enregistrer')
        .on('click', function() { // button de validation

                /*
                 requete d'insertion vente
                 */

                $('#' + $modalId).modal('hide');
        })
    })

})