$(function () {

    let namespace = "#menu-detail-vente ";

    /*--------------------------

        MENU DETAIL VENTE

     ----------------------*/

    exportToExcel(namespace + '.btn-export-to-excel','detail-ventes-' , namespace + '.table-detail-vente')

    // listes d'article dans une vente

    $listesArticlesVendus = [
        {
            codeArticle: 'codeArticle',
            nomArticle: 'nomArticle',
            uniteArticle: 'uniteVendu',
            quantiteArticle: 10,
            prixUNitaireArtile: 5000
        },
        {
            codeArticle: 'codeArticle',
            nomArticle: 'nomArticle',
            uniteArticle: 'uniteVendu',
            quantiteArticle: 7,
            prixUNitaireArtile: 1200
        },
        {
            codeArticle: 'codeArticle',
            nomArticle: 'nomArticle',
            uniteArticle: 'uniteVendu',
            quantiteArticle: 1,
            prixUNitaireArtile: 190000
        }
    ];

    // listes des ventes

    $listesVente = [

        {
            referenceVente: 'ref-0123456789',
            nomCLient: 'nomCLient',
            listeVente: $listesArticlesVendus,
            dateVente: new Date().toLocaleString()
        },
        {
            referenceVente: 'ref-987654321',
            nomCLient: 'nomCLient II',
            listeVente: $listesArticlesVendus,
            dateVente: new Date().toLocaleString()
        }
    ];

    /*
     insert into table > tbody > tr
     */

    $.each($listesVente, function (keyVente, valueVente) {

        $.each($listesArticlesVendus, function (keyArticle, valueArticle) {

            $tr = $('<tr></tr>')
                .attr('class', valueVente.referenceVente)
                .append('' +
                    '<td>' + valueVente.referenceVente + '</td>' +
                    '<td>' + valueVente.nomCLient + '</td>' +
                    '<td>' + valueArticle.nomArticle + '</td>' +
                    '<td>' + valueArticle.uniteArticle + '</td>' +
                    '<td class="text-align-right">' + valueArticle.quantiteArticle + '</td>' +
                    '<td class="text-align-right">' + valueArticle.prixUNitaireArtile + ' Ar</td>' +
                    '<td class="text-align-right">' + (valueArticle.quantiteArticle * valueArticle.prixUNitaireArtile) + ' Ar</td>' +
                    '<td>' + valueVente.dateVente + '</td>');

            $(namespace + '.table-detail-vente tbody').append($tr);
            $(namespace + 'td.text-align-right').css('textAlign', 'right');

        })
    })

})