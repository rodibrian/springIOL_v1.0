$(function () {
    const namespace = "#menu-stock ";
    const TOUTES = "";
    const INVENTORY_URL = "http://localhost:8080/api/v1/inventories";
    const STORE_INVENTORY_URL = "http://localhost:8080/api/v1/inventories/stores/";
    /*
    MENU STOCK
     */
    // CONST
    const QUANTITE_ALERT = 0;
    // css
    $('.btn-40').css('height', '40px');
    // Chargement des données de stock

    // $.each($lesArticles, function (key, article) {
    //     $.each(article.uniteArticle, function (keyU, articleU) {
    //         $trArticle = $('<tr></tr>').attr('id', article.codeArticle + '-' + keyU);
    //         $trArticle.append('' +
    //             '            <td class="s-no-value code-article">' + $trArticle.attr('id') + '</td>\n' +
    //             '            <td class="designation-article">' + article.nomArticle + '</td>\n' +
    //             '            <td class="unite-article">' + articleU + '</td>\n' +
    //             '            <td class="article-prix">' + article.prix[keyU] + '</td>\n' +
    //             '            <td class="s-no-value article-stock-1">' + article.stock[0] + '</td>\n' +
    //             '            <td class="s-no-value article-stock-2">' + article.stock[1] + '</td>\n' +
    //             '            <td class="td-info-stock">\n' +
    //             '              <a type="button" class="btn-default mr-1 btn-info-stock" data-bs-toggle="modal"\n' +
    //             '                 data-bs-target="#info-stock">' + (parseFloat(article.stock[0]) + parseFloat(article.stock[1])) + '</a>\n' +
    //             '            </td>\n' +
    //             '            <td class="s-no-value article-date-peremption">' + article.peremption + '</td>\n' +
    //             '            <td class="s-value article-valeur">' + ( (parseFloat(article.stock[0]) + parseFloat(article.stock[1]))  * parseFloat(article.prix[keyU])) + ' Ar</td>\n' +
    //             '          ' +
    //             '').html();
    //         $('.table-article-stock tbody').append($trArticle);
    //     })
    //
    //
    // })
    // Details d'event stock
    $(document).on('click', '.td-info-stock .btn-info-stock', function () {
        $currentArticleTr = $(this).closest('tr');
        $('#info-stock').attr('data-id', $currentArticleTr.attr('id'));
        // affectation des valeur de chaque paragraphe
        $('#info-stock p.label-code-article').text('Code Article : ' + $currentArticleTr.attr('id'));
        $('#info-stock p.label-designation-article').text('Designation : ' + $currentArticleTr.children('.designation-article').text());
        $('#info-stock p.label-unite-article').text('Unite : ' + $currentArticleTr.children('.unite-article').text());
        $('#info-stock p.label-stock-initial-article').text('Stock Initial : ' + $currentArticleTr.children('.td-info-stock').text());
        $('#info-stock p.label-stock-final-article').text('Stock Final : ' + $currentArticleTr.children('.td-info-stock').text());
        $('#info-stock #date-debut').val(formatDate(new Date()));
        $('#info-stock #date-fin').val(formatDate(new Date()));
    })

    function getStoreInventories(url) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function (data) {
                // Supprimer les données dans la table
                $(namespace + " #inventory-table tbody tr").empty();
                // ajouter les donnés dans la table
                $.each(data, function (key, value) {
                    $tr = [value.article, value.unite, value.categorie,value.quantite];
                    $stockId = value.magasinId + "-" + value.articleId + "-" + value.uniteId;
                    push_to_inventory_table_list(namespace + " #inventory-table",$stockId,$tr);
                });
            }
        });
    }

// EVENT SELECT
    $(document).on('change',"#magasin-select",function(){
        let val = $(this).val();
        let url = val===TOUTES ? INVENTORY_URL : STORE_INVENTORY_URL+val;
        getStoreInventories(url);
    });

    // button event
    $(document).on('click',namespace+" #toutes-button",function () {
        getStoreInventories(INVENTORY_URL);
    });

    // VALEUR DE STOCK
    $('.btn-stock-valeur').click(function () {
        $('.s-value').toggle();
        $('.s-no-value').toggle();
        $montantStock = 0;
        $.each($('.table-article-stock tbody tr'), function(key, value) {
            console.log($(value).children('.article-valeur').html())
            $montantStock += parseFloat($(value).children('.article-valeur').text().replaceAll(' Ar', ''));
        })
        $('.label-valeur-stock').text("Montant total : " + $montantStock + " Ar");
    });


    // click of tr

    $('.table-article-stock tr').click(function () {

    })
    $('.s-value').hide();
    // click stock en valeur
    $('.btn-stock-valider').click(function () {
        $('.btn-stock-valeur').click();
    })
})