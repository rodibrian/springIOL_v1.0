$(function () {

    let namespace = "#menu-prix ";

    /*

    MENU PRIX

     */

    /*
     export
     */

    exportToExcel(namespace + '.btn-export-to-excel','prix' , namespace + '.table-article-prix')

    /*
     Chargement des données de la table
     */

    $lesArticles = [
        {
            codeArticle: '123',
            nomArticle: 'Biscuit',
            uniteArticle: ['piece', 'carton', 'sac'],
            prix: ['0', '0', '0'] // prix par unité
        },
        {
            codeArticle: '456',
            nomArticle: 'Bonbon',
            uniteArticle: ['piece', 'carton', 'sac', 'sac10'],
            prix: ['0', '0', '0', '0'] // prix par unité
        },
        {
            codeArticle: '789',
            nomArticle: 'Jus',
            uniteArticle: ['Litre', 'Bouteille de 5L', 'Bidon de 20L'],
            prix: ['0', '0', '0'] // prix par unité
        }
    ]

    $.each($lesArticles, function(keyArticle, valueArticle) {
        $.each(valueArticle.uniteArticle, function(keyUnite, valueUnite) {
            $trArticle = $('<tr></tr>').attr('id', valueArticle.codeArticle + '-' + keyUnite);
            $trArticle.append('\n' +
                '            <td>' + $trArticle.attr("id") + '</td>\n' +
                '            <td class="designation">' + valueArticle.nomArticle + '</td>\n' +
                '            <td class="unite">' + valueArticle.uniteArticle[keyUnite] + '</td>\n' +
                '            <td class="prix">' + valueArticle.prix[keyUnite] + '</td>\n' +
                '            <td class="date-maj">' + new Date().toLocaleString() + '</td>\n' +
                '            <td class="d-flex justify-content-center">\n' +
                '              <a role="button" class="btn btn-sm btn-info info-prix">\n' +
                '                <i class="uil-pen"></i>\n' +
                '              </a>\n' +
                '            </td>\n' +
                '          ');
            $(namespace + '.table-article-prix tbody').append($trArticle);
        })
    })

    /*

    EVENT MANAGER

     */

    /*
     edition de prix, en click
     */

    $(document).on('click', '.info-prix', function() {

        $trArticle = $(this).closest('tr');

        $('#modal-info-prix').modal('show');
        $('#modal-info-prix').attr('data-id', $trArticle.attr('id'))

        // affecter à mis a jour prix

        $('#modal-info-prix .label-designation-article').text('Designation : ' + $trArticle.children('.designation').text())
        $('#modal-info-prix .label-unite-article').text('(' + $trArticle.children('.unite').text() + ')')
        $('#modal-info-prix .input-prix-edit').val($trArticle.children('.prix').text())
        $('#modal-info-prix .label-date-prix').text('Date : ' + $trArticle.children('.date-maj').text())
    })

    /*
     enregistrement d'un prix courant
     */

    $('#modal-info-prix .btn-enregistrer-prix-editer').on('click', function() {

        let userId = $(namespace + '#user-id').attr("value-id");

        $nouveauPrix = $('.input-prix-edit').val();
        console.log($('.table-article-prix tbody').children('#' + $('#modal-info-prix').attr('id')).children('.prix'));
        $('.table-article-prix tbody').children('#' + $('#modal-info-prix').attr('data-id')).children('.prix').text($nouveauPrix)

        // ajout à l'historique

        $("#table-historique-prix tbody")
            .append('<tr></tr>')
            .append('' +
                '<td>' + new Date().toLocaleString() + '</td>\n'+
                '<td>' + $nouveauPrix + ' Ar</td>\n'+
                '<td>current user</td>');

        createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du prix effectu&eacute; avec succ&egrave;s!')
    })

    /*
     double click of tr, open facture info
     */

    $('.table-article-prix tbody tr').dblclick(function () {

        // get code article when dblcliked article
        
        let code = $(this).children()[0].innerText;
        console.log(code)


    })


})