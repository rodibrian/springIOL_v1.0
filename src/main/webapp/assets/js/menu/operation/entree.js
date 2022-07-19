$(function () {
    let namespace = "#menu-entree-article ";
    let infoArticletab = [];
    let prixTab = [];
    /*
    ENTREE ARTICLE
     */
    // Chargement des données de la page;
    $("#btn-search-article").click(function () {
        let url = "http://localhost:8080/api/v1/articles";
        // $.ajax({
        //     type: "GET",
        //     url: url,
        //     contentType: 'application/json',
        //     success: function (data){
        //         console.log(data);
        //     }
        // });
    })
    // Selection des fournisseurs
    $(document).on('dblclick',namespace + '#table-liste-fournisseur tbody tr', function(){
        get_select_affect_to_input(namespace + '#input-nom-fournisseur',$(this).attr('id'), $(this).children().eq(0).text());
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
        // enregistrerClientOuFournisseur(fr)
        get_select_affect_to_input(namespace + '#input-nom-fournisseur','', nomFournisseur);
        // vider les champs fournisseurs
    })
    // Selecter article
    $(namespace + '#table-liste-article tbody tr').on('dblclick', function () {
        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(2).attr("id");
        get_select_affect_to_input(namespace + '#input-designation-article',article_id, $(this).children().eq(1).text());
        let IS_CREATE = $(namespace +"#select-unite-article").children().length == 0;
        set_select_option_value_or_update_option([[unite_id,$(this).children().eq(2).text()]], namespace + "#select-unite-article",IS_CREATE);
        $(namespace + ' #input-prix-vente-article').val($(this).children().eq(5).text());
        $(namespace + '#modal-liste-article').modal('hide');
        // après selection article, select * unite de l'article
        // ainsi que son prix
    });
    // Ajout des articles
    $(namespace + '#btn-ajouter-article-entree').on('click', function(){
        let fId = $(namespace + '#input-nom-fournisseur').attr("value-id");
        let magasinId= $(namespace + '#select-magasin').val();
        let articleId = $(namespace + '#input-designation-article').attr("value-id");
        let uniteId = $(namespace + '#select-unite-article option:selected').val();
        let refFact =  $(namespace + '#input-reference-facture').val();
        let prixVente =  $(namespace + '#input-prix-vente-article').val();
        let prixAchat =  $(namespace + '#input-prix-achat-article').val();
        let quantite = $(namespace + '#input-quantite-article').val();
        let dateApprov = new Date();
        let userId = $(namespace + '#user-id').attr("value-id");
        let datePeremption = $(namespace+"#input-date-peremption").val();
        let prixObj = {};
        prixObj.prixVente =  prixVente;
        prixObj.prixAchat = prixAchat;
        // APPROVISIONNEMENT
        let approv = {};
        // Magasin
        approv.magasin = {
            id : magasinId
        }
        // Fournisseur
        approv.fournisseur = {
            id : fId
        }
        approv.quantiteApprov = quantite;
        approv.refFacture = refFact;
        approv.user = {id:userId};
        // INFO ARTICLE MAGASIN
        let infoArticleMagasin ={
            magasin :approv.magasin,
            article : {
                id : articleId
            },
            unite :{
                id : uniteId
            },
            quantiteStock : quantite,
            date : dateApprov,
            datePeremption : datePeremption,
            supply : approv
        }
        infoArticletab.push(infoArticleMagasin);
        prixTab.push(prixObj)
        $articleAjout = [
            $(namespace + '#input-reference-facture').val(),
            $(namespace + '#input-designation-article').val(),
            $(namespace + '#select-unite-article option:selected').text(),
            quantite,
            $(namespace + '#input-prix-achat-article').val(),
            parseFloat($(namespace + '#input-prix-achat-article').val()) * parseFloat(quantite)
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
    });
    // Enregistrement articles
    $(namespace + "#btn-enregistrer-article-entree").on('click', function() {
        $modalId = 'confirmation-d-entree-article'
        $nArticle = $(namespace + '#table-liste-article-entree tbody tr').length;
        $prixAchatTotal = prixTab.reduce((a,b) =>a+b,0);
        $content = '' +
           'Voulez vous vraiment enregistrer les articles entr&eacute;s?' +
           '<li><strong>' + $nArticle + '</strong> Articles</li>';
        create_confirm_dialog('Confirmation d enregistrement des articles', $content, $modalId, 'Oui, Enregistrer', 'btn-success')
            .on('click', function() {
                $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/api/v1/supplies",
                        contentType: "application/json",
                        data: JSON.stringify(infoArticletab),
                        success : function (data){
                            infoArticletab=[];
                            prixTab = [];
                            $('#' + $modalId).modal('hide');
                            $('#' + $modalId).remove();
                            $(namespace + '#table-liste-article-entree tbody tr').remove();
                            createToast('bg-success',
                                'uil-file-check',
                                'Entr&eacute;e d\'article fait',
                                $nArticle + ' articles enregistr&eacute;es avec succ&egrave;s!');
                            console.log(data);
                        }
                });
            })
    })
    // switch magasin <-> voyage
    $('.div-select-voyage').hide();
    $(namespace + '#check-magasin, #check-voyage').on('change', function () {
        $(namespace + '.div-select-magasin').toggle();
        $(namespace + '.div-select-voyage').toggle();
    })

})