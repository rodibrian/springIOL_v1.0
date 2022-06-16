$(function () {

    let namespace = "#menu-entree-article ";

    /*

    ENTREE ARTICLE

     */

    // Chargement des données de la page;

    // données prédefini

    $lesMagasins = [
        {
            code: "m-I", nom: "Magasin I", other : ""
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

        get_select_affect_to_input(namespace + '#input-designation-article', $(this).children().eq(0).text(), $(this).children().eq(1).text());
        set_select_option_value([['0', $(this).children().eq(2).text()]], namespace + "#select-unite-article")
        $(namespace + ' #input-prix-vente-article').val($(this).children().eq(5).text())


        $(namespace + '#modal-liste-article').modal('hide');

        // après selection article, select * unite de l'article
        // ainsi que son prix
    })


    // Ajout des articles

    $(namespace + '#btn-ajouter-article-entree').on('click', function() {

        $articleAjout = [
            $(namespace + '#input-reference-facture').val(),
            $(namespace + '#input-designation-article').val(),
            $(namespace + '#select-unite-article option:selected').text(),
            $(namespace + '#input-quantite-article').val(),
            $(namespace + '#input-prix-achat-article').val(),
            parseFloat($(namespace + '#input-prix-achat-article').val()) * parseFloat($(namespace + '#input-quantite-article').val())
        ]
        push_to_table_list(namespace + "#table-liste-article-entree", "", $articleAjout);

        // vider les input
        $(namespace + '#input-designation-article').val('');
        $(namespace + '#input-quantite-article').val('');
        $(namespace + '#input-prix-achat-article').val('');
        $(namespace + '#input-prix-vente-article').val('');
        $(namespace + '#select-unite-article option').remove();
    })

    // Enregistrement articles

    $(namespace + "#btn-enregistrer-article-entree").on('click', function() {
        $modalId = 'confirmation-d-entree-article'
        $nArticle = $(namespace + '#table-liste-article-entree tbody tr').length;
       $content = '' +
           'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
           '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation d enregistrement des articles', $content, $modalId, 'Oui, Enregistrer', 'btn-success')
            .on('click', function() {
                $('#' + $modalId).modal('hide');
                $('#' + $modalId).remove();

                createToast('bg-success',
                    'uil-file-check',
                    'Entr&eacute;e d\'article fait',
                    $nArticle + ' articles enregistr&eacute;es avec succ&egrave;s!');
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