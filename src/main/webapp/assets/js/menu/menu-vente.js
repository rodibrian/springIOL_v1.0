$(function () {

    let venteTab = [];

    /* -------------------------------------------------------------------------------
                                       MENU VENTE SCRIPT
    -------------------------------------------------------------------------------- */


    /*-------------------------------------------------------------------------------
    let namespace = "#menu-vente ";

    /*------------------------------------------------------------------------------
                                            OPERATION
     -------------------------------------------------------------------------------*/

     let namespace = "#menu-vente ";

     /*
     Selecter client
     */

    $(namespace + '#table-liste-client tbody tr').on('dblclick', function () {

        get_select_affect_to_input(namespace + '#name-client', $(this).attr('id'), $(this).children().eq(0).text());
        $(namespace + '#modal-liste-client').modal('hide');

    })

    /*------------------------------------------------------------------------------
                                            SELECTER ARTICLE
    -------------------------------------------------------------------------------*/

    function updatePrixUnitaire(article_id, unite_id, filialeId) {

        $.ajax({
            type: "get",
            url: "http://localhost:8080/api/v1/articles/" + article_id + "/unites/" + unite_id + "/filiales/" + filialeId + "/prices",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $(namespace + "#input-prix-unitaire").val(data);
            }
        });
    }

    $(document).on('dblclick', namespace + '#table-liste-article tbody tr', function () {

        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("id");
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        get_select_affect_to_input(namespace + '#designation-article',article_id,$(this).children().eq(1).text());
        $(namespace + '#modal-liste-article').modal('hide');
        set_select_option_value([unite_id, $(this).children().eq(2).text()], namespace + "#input-unite-article");
        updatePrixUnitaire(article_id, unite_id, filialeId);
        get_select_affect_to_input(namespace + "#input-prix-unitaire", "", $(this).children().eq(5).text())

        // après selection article, select * unite de l'article
        // ainsi que son prix

    });

    /*------------------------------------------------------------------------------
                                            PRIX- SPECIAL ARTICLE
     -------------------------------------------------------------------------------*/

    $(namespace + '#modal-prix-special .btn-enregistrer-modal').on('click', function () {

        $isRemise = $(namespace + '#check-prix-special-remise').is(':checked');
        $current_price = $(namespace + '#input-prix-unitaire').val();
        $special_value = $(namespace + '#input-prix-special').val();
        $special_price_final = $isRemise ? $current_price - $current_price * ($special_value / 100) : $special_value;
        get_select_affect_to_input(namespace + '#input-prix-unitaire', null, $special_price_final);
        $(namespace + '#modal-prix-special').modal('hide')
    })

    /*------------------------------------------------------------------------------
                                            AJOUT DUN ARTICLE
     -------------------------------------------------------------------------------*/

    $('.btn-ajouter-article-vente').on('click', function (){

        $articleId = $(namespace + '#designation-article').attr('value-id');
        $designation = $(namespace + '#designation-article').val();
        $unite = $(namespace + '#input-unite-article option:selected').text();
        $uniteId = $(namespace + '#input-unite-article option:selected').val();
        $quantite = $(namespace + '#input-quantite-article').val();
        $prix_unitaire = $(namespace + '#input-prix-unitaire').val();
        $clientId = $(namespace + '#name-client').attr("value-id");
        $magasinId= $(namespace + '#select-magasin').val();
        $userId = $(namespace + '#user-id').attr("value-id");
        $reference = $(namespace + '#input-reference-facture').val();
        $montant = $quantite * $prix_unitaire;

        $article_vente = [$designation, $unite, $quantite, $prix_unitaire, $montant];

        let infoArticleMagasin = {};
        infoArticleMagasin.typeOperation = "VENTE";
        infoArticleMagasin.magasin = {id:$magasinId};
        infoArticleMagasin.user = {id:$userId};
        infoArticleMagasin.unite = {id:$uniteId};
        infoArticleMagasin.article = {id : $articleId}
        infoArticleMagasin.quantiteAjout = $quantite;
        infoArticleMagasin.date = new Date();
        infoArticleMagasin.reference = $reference;

        $vente = {};
        $vente.infoArticleMagasin = infoArticleMagasin;
        $vente.client = {id:$clientId};
        $vente.montantVente = $montant;

        venteTab.push($vente);
        push_to_table_list(namespace + '#table-liste-article-vente', $articleId, $article_vente);

        // vider form vente

        $('.form-vente input').each(function () {
            if ($(this).attr('id') != 'name-client') $(this).attr('value', '');
            if ($(this).attr('type') === 'number') $(this).val(0);
        });

        // vide option

        $(namespace + "#input-unite-article option").remove();

        //impression_vente()
    })

    /*------------------------------------------------------------------------------
                                            SUPPRESSION D'UN ARTICLE
     -------------------------------------------------------------------------------*/

    $(namespace + '#table-liste-article-vente tbody tr').on('dblclick', function () {

        $(this).remove();

    })

    /*
     enregistrement du vente
     */

    $sommeVente = 0;
    $countArticle = 0;
    $content = '' +
        'Voulez vous vraiment enregistrer ce vente? <br><br>' +
        '<li>Nombre d\'article : <strong>' + $countArticle + '</strong></li>' +
        '<li>Somme : <strong>' + $sommeVente + ' Ar</strong></li>' +
        '';

    $(namespace+'.form-vente .btn-enregistrer-vente').on('click',function (){

        $modalId = 'confirmation-de-vente';

        function persistSales() {

            // button de validation

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/v1/ventes",
                contentType: "application/json",
                data: JSON.stringify(venteTab),
                success: function (data) {
                    venteTab = [];

                    // impresion

                    // vider table

                    $(namespace + '#table-liste-article-vente tbody tr').remove();
                    $(namespace + '#' + $modalId).modal('hide');
                    createToast('bg-success', 'uil-file-check-alt', 'Vente Fait', 'Vente enregistr&eacute; avec succ&egrave;s!')


                }
            });
        }
        create_confirm_dialog('Confirmation de Vente', $content, $modalId, 'Enregistrer', 'btn-primary')
            .on('click', function () {
                impression_vente();
                persistSales();
            })
    });

    function impression_vente() {

        generer_ticket()
        generer_facture()
    }


    // Facturation de vente

    function generer_ticket() {
        let space = namespace + '#impression-ticket-caisse ';

        /*
        information ticket
         */

        $client = $(namespace + "#name-client").val();
        $magasin = $(namespace + "#select-magasin option:selected").text();
        $user = $('.account-user-name').text();

        /*
        add information
         */

        $(space + '.label-nom-client').text($client);
        $(space + '.label-magasin').text($magasin);
        $(space + '.label-utilisateur').text($user);

        $somme = 0;

        $(namespace + '#table-liste-article-vente tbody tr').each(function (index,tr) {
            $array = [$(tr).children().eq(0).text(),$(tr).children().eq(1).text(),$(tr).children().eq(2).text(),$(tr).children().eq(3).text(),$(tr).children().eq(4).text()]
            push_to_table_list(space + '#table-liste-ventes','',$array)
            $somme += parseFloat($(tr).children().eq(4).text());
        })

        $(space + '.label-subtotal-vente').text($somme + 'Ar');
        $(space + '.label-total-vente').text($somme + 'Ar');
        $(space + '.label-somme-en-lettre').text(NumberToLetter($somme) + ' ariary');

        // print
        $(space).printThis();
    }

    function generer_facture() {
        let space = namespace + '#impression-facture-vente ';

        /*
        information facture
         */

        $client = $(namespace + "#name-client").val();
        $magasin = $(namespace + "#select-magasin option:selected").text();
        $user = $('.account-user-name').text();

        /*
        add information
         */

        $(space + '.label-nom-client').text($client);
        $(space + '.label-magasin').text($magasin);
        $(space + '.label-utilisateur').text($user);

        $somme = 0;

        $(namespace + '#table-liste-article-vente tbody tr').each(function (index,tr) {
            $array = [$(tr).children().eq(0).text(),$(tr).children().eq(1).text(),$(tr).children().eq(2).text(),$(tr).children().eq(3).text(),$(tr).children().eq(4).text()]
            push_to_table_list(space + '#table-liste-ventes','',$array)
            $somme += parseFloat($(tr).children().eq(4).text());
        })

        $(space + '.label-subtotal-vente').text($somme + 'Ar');
        $(space + '.label-total-vente').text($somme + 'Ar');
        $(space + '.label-somme-en-lettre').text(NumberToLetter($somme) + ' ariary');

        // print
        $(space).printThis()

    }


})