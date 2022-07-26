$(function () {
    /*----------------------------------
              JS OPERATION ENTREE
     -----------------------------------*/
    let namespace = "#menu-entree-article ";
    let supplyTab = [];
    let trIndex = 0;
    /*
     LISTE DES PRIX DE VENTE
     */
    let pvuafTab = [];
    /*
    ENTREE ARTICLE
     */
    // Chargement des données de la page;
    $("#btn-search-article").click(function () {

    })
    // Selection des fournisseurs
    $(document).on('dblclick', namespace + '#table-liste-fournisseur tbody tr', function () {
        get_select_affect_to_input(namespace + '#input-nom-fournisseur', $(this).attr('id'), $(this).children().eq(0).text());
        $(namespace + '#modal-liste-fournisseur').modal('hide');
    })
    /*
     Nouveau Fournisseur
     */
    $(namespace + '#btn-enregistrer-fournisseur').on('click', function (){
        let nomFournisseur = $(namespace + '#nouveau-fournisseur input#nom').val();
        let adresse = $(namespace + '#nouveau-fournisseur input#adresse').val();
        let contact = $(namespace + '#nouveau-fournisseur input#contact').val();
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        let fr = {};
        fr.nom = nomFournisseur;
        fr.adresse = adresse;
        fr.numTel = contact;
        fr.type = 1;
        fr.filiale = {id : filialeId};
        $.ajax({
            type : "POST",
            url : "http://localhost:8080/api/v1/externalEntities",
            contentType: "application/json",
            data : JSON.stringify(fr),
            success : (data) =>{
                get_select_affect_to_input(namespace + '#input-nom-fournisseur', data.id, nomFournisseur);
                // vider les champs fournisseurs
                $(namespace + '#nouveau-fournisseur input#nom').val("");
            }
        })
    })
    /*
     Selecter article
     */
    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {
        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("value-id");
        let prix = $(this).children().eq(5).text();
        get_select_affect_to_input(namespace + '#input-designation-article', article_id, $(this).children().eq(1).text());
        let IS_CREATE = $(namespace + "#select-unite-article").children().length == 0;
        set_select_option_value_or_update_option([[unite_id, $(this).children().eq(2).text()]], namespace + "#select-unite-article", IS_CREATE);
        $(namespace + '#input-prix-vente-article').val("");
        $(namespace + '#modal-liste-article').modal('hide');
        // après selection article, select * unite de l'article
        // ainsi que son prix
    });

    /*
     Ajout des articles
     */

    $(function() {
        $(namespace + 'form').validate({
            rules : {
                designation : {required : true},
                quantite : {required: true,number : true, min : 0.0001},
                unite : {required : true},
                prixAchat : {required : true, number : true, min : 1},
                prixVente : {required : true, number : true, min : 1},
                datePeremption : {required : true}
            },
            messages : {
                designation : { required : ''},
                quantite : {required : 'Quantite non valide', min : 'Quantite doit être >0'},
                unite : {required : 'Unite requis pour un article'},
                prixAchat: {required : 'Prix \'achat non valide', number : 'Prix \'achat non valide', min : 'Prix d\'achat doit être >0'},
                prixVente: {required : 'Prix de vente non valide', number : 'Prix \'achat non valide', min : 'Prix de vente doit être >0'},
                datePeremption : {required : 'date de peremption requis'}
            }
        })
    })

    function validation_ajout_article() {
        $(namespace + 'form').validate();

        return $(namespace + 'form').valid();
    }


    $(namespace + '#btn-ajouter-article-entree').on('click', function () {

        if (validation_ajout_article()) {

            let fId = $(namespace + '#input-nom-fournisseur').attr("value-id");
            let magasinId = $(namespace + '#select-magasin').val();
            let articleId = $(namespace + '#input-designation-article').attr("value-id");
            let uniteId = $(namespace + '#select-unite-article option:selected').val();
            let refFact = $(namespace + '#input-reference-facture').val();
            let prixVente = $(namespace + '#input-prix-vente-article').val();
            let prixAchat = $(namespace + '#input-prix-achat-article').val();
            let quantite = $(namespace + '#input-quantite-article').val();
            let dateApprov = new Date();
            let userId = $(namespace + '#user-id').attr("value-id");
            let filialeId = $(namespace + '#filiale-id').attr("value-id");
            let datePeremption = $(namespace + "#input-date-peremption").val();

            // PRIX ARTICLE UNITE FILIALE
            let fuap = {};
            fuap.filiale = {
                id: filialeId
            }
            fuap.unite = {
                id: uniteId
            };
            fuap.article = {
                id: articleId
            }
            fuap.user = {
                id: userId
            }
            fuap.dateEnregistrement = dateApprov;
            fuap.prixVente = prixVente;
            pvuafTab.push(fuap);
            let infoArticleMagasin = {};
            infoArticleMagasin.typeOperation = "ENTRE";
            infoArticleMagasin.magasin = {
                id: magasinId
            }
            infoArticleMagasin.user = fuap.user;
            infoArticleMagasin.unite = fuap.unite;
            infoArticleMagasin.article = fuap.article;
            infoArticleMagasin.quantiteAjout = quantite;
            infoArticleMagasin.date = dateApprov;
            infoArticleMagasin.reference = refFact;
            // APPROVISIONNEMENT
            let supply = {};
            supply.infoArticleMagasin = infoArticleMagasin;
            supply.fournisseur = {
                id: fId
            };
            supply.montantApprov = prixAchat;
            supply.datePeremption = datePeremption;
            supplyTab.push(supply);
            $articleAjout = [
                $(namespace + '#input-reference-facture').val(),
                $(namespace + '#input-designation-article').val(),
                $(namespace + '#select-unite-article option:selected').text(),
                quantite,
                $(namespace + '#input-prix-achat-article').val(),
                parseFloat($(namespace + '#input-prix-achat-article').val()) * parseFloat(quantite)
            ]
            push_to_table_list(namespace + "#table-liste-article-entree", trIndex++, $articleAjout);

        // vider les input

        $(namespace + '#input-designation-article').attr('value', '');
        $(namespace + '#input-quantite-article').val(0);
        $(namespace + '#input-prix-achat-article').val(0)
        $(namespace + '#input-prix-vente-article').val(0);
        $(namespace + '#select-unite-article option').remove();
        }
    });

    /*
     suppression articles à la table
     */

    $(document).on('dblclick', "#table-liste-article-entree tbody tr", function () {
        $(this).remove();
        let id = $(this).attr("id");
        delete (pvuafTab[id]);
        delete (supplyTab[id]);
        $designation = $(this).children().eq(1).text();
        createToast('bg-danger', 'uil-trash-alt', 'Enlevement Article', $designation + ' supprim&eacute;')
    });

    function onSuppliesCreated() {
        supplyTab = [];
        pvuafTab = [];
        trIndex = 0;
        $('#' + $modalId).modal('hide');
        $('#' + $modalId).remove();
        $(namespace + '#table-liste-article-entree tbody tr').remove();
        createToast('bg-success',
            'uil-file-check',
            'Entr&eacute;e d\'article fait',
            $nArticle + ' articles enregistr&eacute;es avec succ&egrave;s!');
    }

    /*
     Enregistrement articles
     */

    $(namespace + "#btn-enregistrer-article-entree").on('click', function () {
        $modalId = 'confirmation-d-entree-article'
        $nArticle = $(namespace + '#table-liste-article-entree tbody tr').length;
        $content = '' +
            'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
            '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation d enregistrement des articles', $content, $modalId, 'Oui, Enregistrer', 'btn-success')
            .on('click', function () {
                let supplyWrapper = {};
                supplyWrapper.supplies = supplyTab;
                supplyWrapper.prixArticleFiliales = pvuafTab;
                let url ="http://localhost:8080/api/v1/supplies";
                execute_ajax_request("post",url,supplyWrapper,(data)=>{
                    onSuppliesCreated();
                    impression_entree()
                });
                })
            if ($nArticle == 0) $(namespace + '#btn-' + $modalId).attr('disabled', 'disabled');
    });

    /*
     switch magasin <-> voyage
     */

    $('.div-select-voyage').hide();
    $(namespace + '#check-magasin, #check-voyage').on('change', function () {
        $(namespace + '.div-select-magasin').toggle();
        $(namespace + '.div-select-voyage').toggle();
    })

    /*

    facturation

     */

    function impression_entree() {
        generer_bon();
    }

    function generer_bon() {
        let space = namespace + '#impression-bon-entree-ou-sortie ';
        $(space + '.label-bon-entree-ou-sortie').text('Bon d\'entrée');
        $(space + '.no-entree').hide();
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
        $(namespace + '#table-liste-article-entree tbody tr').each(function (index, tr) {
            $array = [$(tr).children().eq(0).text(), $(tr).children().eq(1).text(), $(tr).children().eq(2).text(), $(tr).children().eq(3).text(), $(tr).children().eq(4).text(), $(tr).children().eq(5).text()]
            push_to_table_list(space + '#liste-article-bon', '', $array)
            $somme += parseFloat($(tr).children().eq(5).text());
        })
        ;
        $(space + '.label-total-entree').text($somme + 'Ar');
        $(space + '.label-somme-en-lettre').text(NumberToLetter($somme) + ' ariary');
        // print
        $(space).printThis()
    }
})