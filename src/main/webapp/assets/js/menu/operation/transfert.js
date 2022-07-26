$(function() {
    /*

    TRASNFERT ARTICLE

     */

    let transferTab = [];

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
        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("id");
        get_select_affect_to_input(namespace + '.designation-article',article_id, $(this).children().eq(1).text());
        set_select_option_value_or_update_option([unite_id, $(this).children().eq(2).text()], namespace + "#select-unite")
        $(namespace + '#modal-liste-article').modal('hide');
        // après selection article, select * unite de l'article
    })
    // Ajout des articles
    $(namespace + '.btn-ajouter-article').on('click', function() {
        let articleId = $(namespace + '#input-designation-article').attr('value-id');
        let magasinSourceId= $(namespace + '#select-magasin-source').val();
        let magasinDestId= $(namespace + '#select-magasin-dest').val();
        let userId = $(namespace + '#user-id').attr("value-id");
        let designation = $(namespace + '#input-designation-article').val();
        let reference = $(namespace + '#input-reference').text();
        let unite = $(namespace + '#select-unite-article option:selected').text();
        let uniteId = $(namespace + '#select-unite-article option:selected').val();
        let description = $(namespace + '#area-description').val();
        let quantite = $(namespace + '#input-quantite').val();

        let transfert = {};
        transfert.article = {
            id : articleId
        }
        transfert.unite = {id:uniteId};
        transfert.magasinSource = {id:magasinSourceId};
        transfert.magasinDest = {id:magasinDestId};
        transfert.reference = reference;
        transfert.user = {id:userId};
        transfert.date = new Date();
        transfert.quantite= quantite;
        transfert.description = description;
        transferTab.push(transfert);
        console.log(transfert);
        $articleAjout = [designation,unite,quantite,description];
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