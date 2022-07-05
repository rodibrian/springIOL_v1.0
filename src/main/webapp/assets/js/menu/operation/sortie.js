$(function () {

    let namespace = "#menu-sortie-article ";

    /*

    SORTIE ARTICLE

     */

    // Chargement des données de la page;

    // données prédefini

    $lesMagasins = [
        {
            code: "m-I", nom: "Magasin I"
        },
        {
            code: "m-II", nom: "Magasin II"
        },
        {
            code: "m-III", nom: "Magasin III"
        },
        {
            code: "m-IV", nom: "Magasin IV"
        }
    ];

    $lesVoyages = [
        {
            reference: "v-123", libelle: "Voyage Ier"
        },
        {
            reference: "v-456", libelle: "Voyage IIem"
        }
    ]

    set_select_option_value($lesMagasins, namespace + "#select-magasin")

    set_select_option_value($lesVoyages, namespace + "#select-voyage")

    // Selecter article

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {

        get_select_affect_to_input(namespace + '#input-designation-article',$(this).children().eq(0).text(), $(this).children().eq(1).text());
        set_select_option_value([['0', $(this).children().eq(2).text()]], namespace + "#select-unite-article")

        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
    })


    // Ajout des articles

    $(namespace + '#btn-ajouter-article-sortie').on('click', function() {

        $articleAjout = [
            $(namespace + '#input-designation-article').val(),
            $(namespace + '#select-unite-article option:selected').text(),
            $(namespace + '#input-quantite-article').val(),
            $(namespace + '#input-motif').val(),
        ]
        push_to_table_list(namespace + "#table-liste-article-sortie", "", $articleAjout);

        // vider les input
        $(namespace + '#input-designation-article').attr('value','');
        $(namespace + '#input-quantite-article').val(0);
        $(namespace + '#select-unite-article option').remove();
    })

    // suppression articles à la table

    $(document).on('dblclick',"#table-liste-article-sortie tbody tr", function() {
        $(this).remove();
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger','uil-trash-alt','Enlevement Article',$designation + ' supprim&eacute;')
    })

    // Enregistrement articles

    $(namespace + "#btn-enregistrer-article-sortie").on('click', function() {
        $modalId = 'confirmation-d-sortie-article'
        $nArticle = $(namespace + '#table-liste-article-sortie tbody tr').length;
       $content = '' +
           'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
           '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation de sortie des articles', $content, $modalId, 'Oui, Sortir', 'btn-warning')
            .on('click', function() {
                $('#' + $modalId).modal('hide');
                $('#' + $modalId).remove();

                $(namespace + '#table-liste-article-sortie tbody tr').remove();

                createToast('bg-warning',
                    'uil-file-check',
                    'Sortie d\'article fait',
                    $nArticle + ' articles sorties avec succ&egrave;s!');
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