$(function() {

    /*-------------------------

           TRASNFERT ARTICLE

     -------------------------*/

    let transferTab = [];

    let namespace = "#transfert-article ";

    /*
     event type transfert change
     */

    $(namespace + '#source-destination').on('change', function() {

        let activeClass = $(this).children('option:selected').attr('value')
        $(namespace + '.select-src select').hide()
        $(namespace + '.select-dst select').hide()

        $(namespace + '.select-src select.'+activeClass).show();
        $(namespace + '.select-dst select.'+activeClass).show();

    })

    /*
     déclencher event on start
     */

    $(namespace + '#source-destination').trigger('change');

    /*
     Selecter article
     */

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {

        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("value-id");
        get_select_affect_to_input(namespace + '.designation-article',article_id, $(this).children().eq(1).text());
        set_select_option_value([unite_id, $(this).children().eq(2).text()], namespace + "#select-unite")
        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article

    })

    /*
     Ajout des articles
     */

    $(namespace + '.btn-ajouter-article').on('click', function() {

        let articleId = $(namespace + '#input-designation-article').attr('value-id');
        let magasinSourceId= $(namespace + '#select-magasin-source').val();
        let magasinSourceNom= $(namespace + '#select-magasin-source option:selected').text();
        let magasinDestId= $(namespace + '#select-magasin-dest').val();
        let magasinDestNom= $(namespace + '#select-magasin-dest option:selected').text();
        let userId = $(namespace + '#user-id').attr("value-id");
        let designation = $(namespace + '#input-designation-article').val();
        let reference = $(namespace + '#input-reference').val();
        let unite = $(namespace + '#select-unite option:selected').text();
        let uniteId = $(namespace + '#select-unite option:selected').val();
        let description = $(namespace + '#area-description').val();
        let quantite = $(namespace + '#input-quantite').val();
        let chauffeur = $(namespace + '#input-chauffeur ').val();
        let transfert = {};

        // SOURCE

        let iam_source = {};
        iam_source.typeOperation = "TRANSFERT VERS "+magasinDestNom;
        iam_source.magasin = {id:magasinSourceId};
        iam_source.user = {id:userId};
        iam_source.unite = {id:uniteId};
        iam_source.article = {
            id : articleId
        }
        iam_source.quantiteAjout = quantite;
        iam_source.date = new Date();
        iam_source.description = description;
        iam_source.reference = reference;

        // DESTINATAIRE

        let iam_dest = {};
        iam_dest.typeOperation = "TRANSFERT VENANT DE "+magasinSourceNom;
        iam_dest.magasin = {id:magasinDestId};
        iam_dest.user =  iam_source.user;
        iam_dest.unite = iam_source.unite;
        iam_dest.article = iam_source.article;
        iam_dest.quantiteAjout = quantite;
        iam_dest.date = new Date();
        iam_dest.description = iam_source.description;
        iam_dest.reference = reference;

        transfert.magasinSource = iam_source.magasin;
        transfert.magasinDest = iam_dest.magasin;
        transfert.chauffeur = chauffeur;
        transfert.infoArticleMagasinList = [iam_dest,iam_source];
        transferTab.push(transfert);

        $articleAjout = [designation,unite,quantite,description];
        push_to_table_list(namespace + ".table-liste-article-transfert", "", $articleAjout);

        // vider les input

        $(namespace + '.designation-article').attr('value','');
        $(namespace + '#input-quantite').val(0);
        $(namespace + '#area-description').attr('value','');
        $(namespace + '#select-unite option').remove();

    })

    /*
     suppression articles à la table
     */

    $(document).on('dblclick',".table-liste-article-transfert tbody tr", function() {

        $(this).remove();
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger','uil-trash-alt','Enlevement Article',$designation + ' supprim&eacute;')

    })

    /*
     Enregistrement articles
     */

    function persitTransfertData() {

        let url = "http://localhost:8080/api/v1/transferts";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(transferTab),
            contentType: "application/json",
            success: function (data) {
                transferTab = [];
                $('#' + $modalId).modal('hide');
                $('#' + $modalId).remove();
                $(namespace + '.table-liste-article-transfert tbody tr').remove();
                createToast('bg-primary',
                    'uil-file-check',
                    'Transfert d\'article fait',
                    $nArticle + ' articles transfer&eacute; avec succ&egrave;s!');
            }
        })

    }

    $(namespace + ".btn-enregistrer-article").on('click', function() {

        $modalId = 'confirmation-de-transfert-article'
        $nArticle = $(namespace + '.table-liste-article-transfert tbody tr').length;
        $content = '' +
            'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
            '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation de transfert des articles', $content, $modalId, 'Oui, Transfert', 'btn-primary')
            .on('click', function() {
                persitTransfertData();

            })
    })
})