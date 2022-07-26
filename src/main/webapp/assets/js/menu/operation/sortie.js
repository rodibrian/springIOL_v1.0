$(function () {
    let namespace = "#menu-sortie-article ";
    let sortieTab = [];
    // Selecter article
    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {
        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("id");
        get_select_affect_to_input(namespace + '#input-designation-article',article_id, $(this).children().eq(1).text());
        set_select_option_value([unite_id, $(this).children().eq(2).text()], namespace + " #select-unite-article")
        $(namespace + '#modal-liste-article').modal('hide');
        // après selection article, select * unite de l'article
    })

    // Ajout des articles
    $(namespace + '#btn-ajouter-article-sortie').on('click', function(){
        let articleId = $(namespace + '#input-designation-article').attr('value-id');
        let magasinId= $(namespace + '#select-magasin').val();
        let userId = $(namespace + '#user-id').attr("value-id");
        let designation = $(namespace + '#input-designation-article').val();
        let unite = $(namespace + '#select-unite-article option:selected').text();
        let uniteId = $(namespace + '#select-unite-article option:selected').val();
        let motif = $(namespace + '#input-motif').val();
        let quantite = $(namespace + '#input-quantite-article').val();
        let sortie = {};
        sortie.article = {
            id : articleId
        }
        sortie.unite = {id:uniteId};
        sortie.magasin = {id:magasinId};
        sortie.user = {id:userId};
        sortie.date = new Date();
        sortie.quantite= quantite;
        sortie.description = motif;
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
    // suppression articles à la table
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

// Enregistrement articles
    $(namespace + "#btn-enregistrer-article-sortie").on('click',function(){
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


    // switch magasin <-> voyage
    $('.div-select-voyage').hide();
    $(namespace + '#check-magasin, #check-voyage').on('change', function () {
        console.log(namespace);
        $(namespace + '.div-select-magasin').toggle();
        $(namespace + '.div-select-voyage').toggle();
    })


})