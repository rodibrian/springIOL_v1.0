$(function () {

    let namespace = "#menu-entree-article ";


    /*

    ENTREE ARTICLE

     */

    // Chargement des données de la page;


    // Selection des fournisseurs

    $(document).on('dblclick',namespace + '#table-liste-fournisseur tbody tr', function() {
        get_select_affect_to_input(namespace + '#input-nom-fournisseur',$(this).attr('ic'), $(this).children().eq(0).text());
        $(namespace + '#modal-liste-fournisseur').modal('hide');
    })

    // Nouveau Fournisseur

    $(namespace + '#btn-enregistrer-fournisseur').on('click', function() {
        let nomFournisseur = $(namespace + '#nouveau-fournisseur input#nom').val();
        let adresse = $(namespace + '#nouveau-fournisseur input#adresse').val();
        let contact = $(namespace + '#nouveau-fournisseur input#contact').val();
        let fr = {};
        fr.nom = nomFournisseur;
        fr.adresse = adresse;
        fr.numTel = contact;
        fr.type = 1;

        get_select_affect_to_input(namespace + '#input-nom-fournisseur','', nomFournisseur);

        // vider les champs fournisseurs

    })

    // Selecter article

    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {

        get_select_affect_to_input(namespace + '#input-designation-article',$(this).children().eq(0).text(), $(this).children().eq(1).text());
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
        $(namespace + '#input-designation-article').attr('value','');
        $(namespace + '#input-quantite-article').val(0);
        $(namespace + '#input-prix-achat-article').val(0)
        $(namespace + '#input-prix-vente-article').val(0);
        $(namespace + '#select-unite-article option').remove();
    })

    // suppression articles à la table

    $(document).on('dblclick',"#table-liste-article-entree tbody tr", function() {
        $(this).remove();
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger','uil-trash-alt','Enlevement Article',$designation + ' supprim&eacute;')
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

                $(namespace + '#table-liste-article-entree tbody tr').remove();

                createToast('bg-success',
                    'uil-file-check',
                    'Entr&eacute;e d\'article fait',
                    $nArticle + ' articles enregistr&eacute;es avec succ&egrave;s!');
            })

    })

    // switch magasin <-> voyage
    $('.div-select-voyage').hide();
    $(namespace + '#check-magasin, #check-voyage').on('change', function () {
        $(namespace + '.div-select-magasin').toggle();
        $(namespace + '.div-select-voyage').toggle();
    })


})