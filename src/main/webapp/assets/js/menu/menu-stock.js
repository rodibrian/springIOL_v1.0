$(function () {

    /*
    MENU STOCK
     */

    // CONST

    const QUANTITE_ALERT = 0;

    // css

    $('.btn-40').css('height', '40px');

    // Chargement des données de stock

    // Exemple d'article à y mettre dans la table

    $lesArticles = [
        {
            codeArticle: '12345',
            nomArticle: 'Biscuit',
            uniteArticle: ['piece', 'carton', 'sac'],
            prix: ['1000', '50000', '0'], // prix par unité
            stock: ['100', '200'], // stock en magasin
            peremption: new Date().toLocaleString()
        },
        {
            codeArticle: '78901',
            nomArticle: 'Bonbon',
            uniteArticle: ['piece', 'carton', 'sac', 'sac10'],
            prix: ['50', '10000', '0', '0'], // prix par unité
            stock: ['50', '500'], // stock en magasin
            peremption: new Date().toLocaleString()
        },
        {
            codeArticle: '56789',
            nomArticle: 'Jus',
            uniteArticle: ['Litre', 'Bouteille de 5L', 'Bidon de 20L'],
            prix: ['10000', '40000', '100000'], // prix par unité
            stock: ['6', '10'], // stock en magasin
            peremption: new Date().toLocaleString()
        }
    ]

    $.each($lesArticles, function (key, article) {
        console.log('ici')
        $.each(article.uniteArticle, function (keyU, articleU) {
            $trArticle = $('<tr></tr>').attr('id', article.codeArticle + '-' + keyU);
            $trArticle.append('' +
                '            <td class="s-no-value code-article">' + $trArticle.attr('id') + '</td>\n' +
                '            <td class="designation-article">' + article.nomArticle + '</td>\n' +
                '            <td class="unite-article">' + articleU + '</td>\n' +
                '            <td class="article-prix">' + article.prix[keyU] + '</td>\n' +
                '            <td class="s-no-value article-stock-1">' + article.stock[0] + '</td>\n' +
                '            <td class="s-no-value article-stock-2">' + article.stock[1] + '</td>\n' +
                '            <td class="td-info-stock">\n' +
                '              <a type="button" class="btn-default mr-1 btn-info-stock" data-bs-toggle="modal"\n' +
                '                 data-bs-target="#info-stock">' + (parseFloat(article.stock[0]) + parseFloat(article.stock[1])) + '</a>\n' +
                '            </td>\n' +
                '            <td class="s-no-value article-date-peremption">' + article.peremption + '</td>\n' +
                '            <td class="s-value article-valeur">' + ( (parseFloat(article.stock[0]) + parseFloat(article.stock[1]))  * parseFloat(article.prix[keyU])) + ' Ar</td>\n' +
                '          ' +
                '').html();
            $('.table-article-stock tbody').append($trArticle);
        })


    })

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