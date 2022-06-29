$(function() {
    /*

    TRASNFERT ARTICLE

     */

    let namespace = "#transfert-article ";

    // event type transfert change

    $(namespace + '#source-destination').on('change', function() {
        let activeClass = $(this).children('option:selected').attr('value')

        $(namespace + '.select-src select').hide()
        $(namespace + '.select-dst select').hide()

        $(namespace + '.select-src select.'+activeClass).show();
        $(namespace + '.select-dst select.'+activeClass).show();
    })

    // déclencher event on start
    $(namespace + '#source-destination').trigger('change');

    // Selecter article

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {

        get_select_affect_to_input(namespace + '.designation-article',$(this).children().eq(0).text(), $(this).children().eq(1).text());
        set_select_option_value([['0', $(this).children().eq(2).text()]], namespace + "#select-unite")

        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
    })


    // Ajout des articles

    $(namespace + '.btn-ajouter-article').on('click', function() {

        $articleAjout = [
            $(namespace + '.designation-article').val(),
            $(namespace + '#select-unite option:selected').text(),
            $(namespace + '#input-quantite').val(),
            $(namespace + '#area-description').val(),
        ]
        push_to_table_list(namespace + ".table-liste-article-transfert", "", $articleAjout);

        // vider les input
        $(namespace + '.designation-article').attr('value','');
        $(namespace + '#input-quantite').val(0);
        $(namespace + '#area-description').attr('value','');
        $(namespace + '#select-unite option').remove();
    })

    // suppression articles à la table

    $(document).on('dblclick',".table-liste-article-transfert tbody tr", function() {
        $(this).remove();
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger','uil-trash-alt','Enlevement Article',$designation + ' supprim&eacute;')
    })

    // Enregistrement articles

    $(namespace + ".btn-enregistrer-article").on('click', function() {
        $modalId = 'confirmation-de-transfert-article'
        $nArticle = $(namespace + '.table-liste-article-transfert tbody tr').length;
        $content = '' +
            'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
            '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation de transfert des articles', $content, $modalId, 'Oui, Transfert', 'btn-primary')
            .on('click', function() {
                $('#' + $modalId).modal('hide');
                $('#' + $modalId).remove();

                $(namespace + '.table-liste-article-transfert tbody tr').remove();

                createToast('bg-primary',
                    'uil-file-check',
                    'Transfert d\'article fait',
                    $nArticle + ' articles transfer&eacute; avec succ&egrave;s!');
            })

    })
})