$(function () {

    /*---------------------------------------------

                JS OPERATION SORTIE

     ------------------------------------------------*/

    let namespace = "#menu-sortie-article ";
    let sortieTab = [];

    /*
     Selecter article
     */

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {

        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("id");
        get_select_affect_to_input(namespace + '#input-designation-article',article_id, $(this).children().eq(1).text());
        set_select_option_value([unite_id, $(this).children().eq(2).text()], namespace + " #select-unite-article")
        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
    })

    /*
     Ajout des articles
     */

    $(namespace + '#btn-ajouter-article-sortie').on('click', function(){

        $ref = 0;
        let articleId = $(namespace + '#input-designation-article').attr('value-id');
        let magasinId= $(namespace + '#select-magasin').val();
        let userId = $(namespace + '#user-id').attr("value-id");
        let designation = $(namespace + '#input-designation-article').val();
        let unite = $(namespace + '#select-unite-article option:selected').text();
        let uniteId = $(namespace + '#select-unite-article option:selected').val();
        let motif = $(namespace + '#input-motif').val();
        let quantite = $(namespace + '#input-quantite-article').val();
        let sortie = {};

        let infoArticleMagasin = {};
        infoArticleMagasin.typeOperation = "SORTIE";
        infoArticleMagasin.quantiteAjout = quantite;
        infoArticleMagasin.date = new Date();
        infoArticleMagasin.reference = "ST - "+$ref;
        infoArticleMagasin.article = {
            id : articleId
        }
        infoArticleMagasin.unite = {id:uniteId};
        infoArticleMagasin.magasin = {id:magasinId};
        infoArticleMagasin.user = {id:userId};
        infoArticleMagasin.description = motif;
        sortie.infoArticleMagasin = infoArticleMagasin;
        sortieTab.push(sortie);

        $articleAjout = [
            designation,
            unite,
            quantite,
            motif,
        ];
        push_to_table_list(namespace + "#table-liste-article-sortie", "", $articleAjout);

        // vider les input

        $(namespace + '#input-designation-article').attr('value','');
        $(namespace + '#input-quantite-article').val(0);
        $(namespace + '#select-unite-article option').remove();
    });

    /*
     suppression articles à la table
     */

    $(document).on('dblclick',"#table-liste-article-sortie tbody tr", function() {

        $(this).remove();
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger','uil-trash-alt','Enlevement Article',$designation + ' supprim&eacute;')

    });

    function persistSortie() {

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/sorties",
            data: JSON.stringify(sortieTab),
            contentType: "application/json",
            success: function (data) {
                $ref = data.id;
                sortieTab = [];
                $('#' + $modalId).modal('hide');
                $('#' + $modalId).remove();
                $(namespace + '#table-liste-article-sortie tbody tr').remove();
                createToast('bg-warning',
                    'uil-file-check',
                    'Sortie d\'article fait',
                    $nArticle + ' articles sorties avec succ&egrave;s!');
            }
        })
    }

    /*
     Enregistrement articles
     */

    $(namespace + "#btn-enregistrer-article-sortie").on('click',function(){

        impression_bon()
        $modalId = 'confirmation-d-sortie-article'
        $nArticle = $(namespace + '#table-liste-article-sortie tbody tr').length;
        $content = '' +
           'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
           '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation de sortie des articles', $content, $modalId, 'Oui, Sortir', 'btn-warning')
            .on('click', function() {
                persistSortie();
            })

    })


    /*
     switch magasin <-> voyage
     */

    $('.div-select-voyage').hide();

    $(namespace + '#check-magasin, #check-voyage').on('change', function () {

        $(namespace + '.div-select-magasin').toggle();
        $(namespace + '.div-select-voyage').toggle();

    })


    /*

    facturation sortie

     */

    function impression_bon() {

        generer_sortie();

    }

    function generer_sortie() {

            let space = namespace + '#impression-bon-entree-ou-sortie ';

            $(space + '.label-bon-entree-ou-sortie').text('Bon de sortie');
            $(space + '.no-sortie').hide();

            /*
            information facture
             */

            $fournisseur = $(namespace + "#input-nom-fournisseur").val();
            $magasin = $(namespace + "#select-magasin option:selected").text();
            $user = $('.account-user-name').text();

            /*
            add information
             */

            $(space + '.label-magasin').text($magasin);
            $(space + '.label-utilisateur').text($user);

            $somme = 0;

            $(namespace + '#table-liste-article-sortie tbody tr').each(function (index, tr) {
                $array = [$(tr).children().eq(0).text(), $(tr).children().eq(1).text(), $(tr).children().eq(2).text(), $(tr).children().eq(3).text()]
                push_to_table_list(space + '#liste-article-bon', '', $array)
                $somme += parseFloat($(tr).children().eq(5).text());
            });

            // print

            $(space).printThis()
        }


})