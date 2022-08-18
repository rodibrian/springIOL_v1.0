$(function () {
    /* -------------------------------------------------------------------------------
                                       MENU VENTE SCRIPT
    -------------------------------------------------------------------------------- */
    let namespace = "#menu-vente ";
    $filiale_id = $(namespace + '#filiale-id').attr("value-id");
    /*
    Selecter client
    */
    function clearForm() {
        $(namespace + '#nouveau-client input#cif').val("");
        $(namespace + '#nouveau-client input#stat').val("");
        $(namespace + '#nouveau-client input#nif').val("");
        $(namespace + '#nouveau-client input#contact').val("");
        $(namespace + '#nouveau-client input#adresse').val("");
        $(namespace + '#nouveau-client input#numCIN').val("");
        $(namespace + '#nouveau-client input#nomClient').val("");
    }
    // ENREGISTRER NOUVEAU CLIENT
    $(namespace + '#nouveau-client #btn-enregistrer-client').on('click', function(){
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        let nomClient = $(namespace + '#nouveau-client input#nomClient').val();
        let cin = $(namespace + '#nouveau-client input#numCIN').val();
        let adresse = $(namespace + '#nouveau-client input#adresse').val();
        let contact = $(namespace + '#nouveau-client input#contact').val();
        let nif = $(namespace + '#nouveau-client input#nif').val();
        let stat = $(namespace + '#nouveau-client input#stat').val();
        let cif = $(namespace + '#nouveau-client input#cif').val();
        let client = {};
        client.nom = nomClient;
        client.cin = cin;
        client.adresse = adresse;
        client.numTel = contact;
        client.nif = nif;
        client.stat = stat;
        client.cif = cif;
        client.typeCf = 0;
        client.filiale = {id: filialeId};
        let url = "http://localhost:8080/api/v1/externalEntities";
        execute_ajax_request("post", url, client, (data) => {
            get_select_affect_to_input(namespace + '#name-client',data.id,data.nom)
            $(namespace+"#nouveau-client").modal("hide");
            // insertion dans la liste des clients du nouveau client enregistrer
            let tr= [data.nom,data.adresse,data.numTel];
            push_to_table_list(namespace+"#table-liste-client",data.id,tr);
        });
        clearForm();
    })

    $(namespace + '#table-liste-client tbody tr').on('dblclick', function () {
        get_select_affect_to_input(namespace + '#name-client', $(this).attr('id'), $(this).children().eq(0).text());
        $(namespace + '#modal-liste-client').modal('hide');
    })
    /*------------------------------------------------------------------------------
                                            SELECTER ARTICLE
    -------------------------------------------------------------------------------*/
    function updatePrixUnitaire(article_id, unite_id, filialeId) {
        let url = "http://localhost:8080/api/v1/articles/" + article_id + "/unites/" + unite_id + "/filiales/" + filialeId + "/prices";
        execute_ajax_request("get", url, null, (data) => $(namespace + "#input-prix-unitaire").val(data))
    }

    $(document).on('dblclick', namespace + '#table-liste-article tbody tr', function () {
        let tr_id = $(this).attr("id");
        let article_id = tr_id.split("-")[0];
        let unite_id = tr_id.split("-")[1];
        $quantite_stock = $(this).children().eq(2).text();
        $prix_article = $(this).children().eq(3).text();
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        get_select_affect_to_input(namespace + '#designation-article', article_id, $(this).children().eq(1).text());
        set_select_option_value([unite_id, $(this).children().eq(1).text()], namespace + "#input-unite-article");
        /* AFFECTATION DU PRIX UNITAIRE */
        $(namespace + "#input-prix-unitaire").val($prix_article);
        get_select_affect_to_input(namespace + "#input-prix-unitaire", "", $(this).children().eq(5).text());
        $(namespace + '#modal-liste-article').modal('hide');
    });
    /*------------------------------------------------------------------------------
                                            PRIX- SPECIAL ARTICLE
     -------------------------------------------------------------------------------*/
    $(namespace + '#modal-prix-special .btn-enregistrer-modal').on('click', function () {
        $isRemise = $(namespace + '#check-prix-special-remise').is(':checked');
        $current_price = $(namespace + '#input-prix-unitaire').val();
        $special_value = $(namespace + '#input-prix-special').val();
        $special_price_final = $isRemise ? $current_price - $current_price * ($special_value / 100) : $special_value;
        get_select_affect_to_input(namespace + '#input-prix-unitaire', null, $special_price_final);
        $(namespace + '#modal-prix-special').modal('hide');
    })
    /*------------------------------------------------------------------------------
                                            SUPPRESSION D'UN ARTICLE
     -------------------------------------------------------------------------------*/
    $(namespace + '#table-liste-article-vente tbody tr').on('dblclick', function () {
        $(this).remove();
    })

    function validation_ajout_article() {
        $quantite_a_vendre = $(namespace + '#input-quantite-article').val();
        $articleId = $(namespace + '#designation-article').attr('value-id');
        $uniteId = $(namespace + '#input-unite-article option:selected').val();
        $magasinId = $(namespace + '#select-magasin').val();
        $(namespace + 'form').validate();
        return $(namespace + 'form').valid();
    }
    /*
    mask et validation
     */
    $('.btn-ajouter-article-vente').on('click',function (){
        if (validation_ajout_article()) {
            $articleId = $(namespace + '#designation-article').attr('value-id');
            $designation = $(namespace + '#designation-article').val();
            $unite = $(namespace + '#input-unite-article option:selected').text();
            $uniteId = $(namespace + '#input-unite-article option:selected').val();
            $quantite = $(namespace + '#input-quantite-article').val();
            $prix_unitaire = $(namespace + '#input-prix-unitaire').val();
            $magasinId = $(namespace + '#select-magasin').val();
            $montant = $quantite * $prix_unitaire;
            $article_vente = [$designation, $unite, $quantite, $prix_unitaire, $montant];
            $row_id = $magasinId+"-"+$articleId+"-"+$uniteId;
            push_to_table_list(namespace + '#table-liste-article-vente',$row_id, $article_vente);
            // vider form vente
            $('.form-vente input').each(function () {
                if ($(this).attr('id') !== 'name-client') $(this).attr('value', '');
                if ($(this).attr('type') === 'number') $(this).val(0);
            });
            // vide option
            $(namespace + "#input-unite-article option").remove();
            //impression_vente()
            updateLabelFooter()
        }
    })
    /*
     enregistrement du vente
     */
    $(namespace + '.form-vente .btn-enregistrer-vente').on('click', function () {
        $countArticl = $(namespace + '#table-liste-article-vente tbody tr').length;
        $sommeMontant = 0
        $(namespace + '#table-liste-article-vente tbody tr').each(function (key, value) {
            $sommeMontant += parseFloat($(value).children().eq(4).text());
        })
        $content = '' +
            'Voulez vous vraiment enregistrer ce vente? <br><br>' +
            '<li>Nombre d\'article : <strong>' + $countArticle + '</strong></li>' +
            '<li>Somme : <strong>' + $sommeMontant + ' Ar</strong></li>' +
            '';
        const getDataFromTable = (ref,date,user_id)=>{
           let tr_tab = $(namespace + '#table-liste-article-vente tbody tr');
           let tab = [];
           $.each(tr_tab,(key,value)=>{
               let row_id = $(value).attr("id");
               let split = row_id.split("-");
               $magasin_id = split[0];
               let article_id = split[1];
               let unite_id = split[2];
               let info = {};
               let quantite = $(value).children().eq(2).text();
               info.typeOperation = "VENTE";
               info.magasin = {id: $magasin_id};
               info.user = {id: user_id};
               info.unite = {id: unite_id};
               info.article = {id: article_id}
               info.quantiteAjout = quantite;
               info.date = date;
               info.reference = ref;
               tab.push(info);
            })
            return tab;
        };
        $modalId = 'confirmation-de-vente';
        create_confirm_dialog('Confirmation de Vente', $content, $modalId, 'Enregistrer', 'btn-primary')
            .on('click',function(){
                $clientId = $(namespace + '#name-client').attr("value-id");
                let nom_client = $(namespace + '#name-client').val();
                let user_id = $(namespace + '#user-id').attr("value-id");
                let date = new Date();
                let ref = create_reference("VENTE",date);
                let $vente = {};

                let info_filiale_caisse = {};
                info_filiale_caisse.operationCaisse = "FACTURE";
                info_filiale_caisse.montantOperation = $sommeMontant;
                info_filiale_caisse.date = date;
                info_filiale_caisse.modePayement = "ESPECE";
                info_filiale_caisse.user = {id:user_id};
                info_filiale_caisse.filiale = {id : $filiale_id};
                info_filiale_caisse.magasin = {id :$magasinId};
                info_filiale_caisse.description = " Facture N°"+ref+" du client " + nom_client;
                $vente.infoArticleMagasin = getDataFromTable(ref,date,user_id);
                $vente.client = {id: $clientId};
                $vente.montantVente = $sommeMontant;
                $vente.refVente = ref;
                $vente.remise = 0;
                $vente.infoFilialeCaisse = info_filiale_caisse;

                let url = "http://localhost:8080/api/v1/sales";
                execute_ajax_request("post", url,$vente, (data) => {
                    // impresion
                    impression_vente();
                    $(namespace + '#table-liste-article-vente tbody tr').remove();
                    $(namespace + '#' + $modalId).modal('hide');
                    createToast('bg-success', 'uil-file-check-alt', 'Vente Fait', 'Vente enregistr&eacute; avec succ&egrave;s!')
                });
                hideAndRemove('#' + $modalId)
            })
        $nArticle = $(namespace + '#table-liste-article-vente tbody tr').length;
        if ($nArticle == 0) $(namespace + '#btn-' + $modalId).attr('disabled', 'disabled');
        else $(namespace + '#btn-' + $modalId).removeAttr('disabled')
    });
    function impression_vente() {
        generer_ticket()
        generer_facture()
    }
    // Facturation de vente
    function generer_ticket(){
        let space = namespace + '#impression-ticket-caisse ';
        /*
        vider la table
         */
        $(space + '#table-liste-ventes tbody tr').remove()

        /*
        information ticket
         */
        $client = $(namespace + "#name-client").val();
        $magasin = $(namespace + "#select-magasin option:selected").text();
        $user = $(namespace + '#user-id').attr('value-id');
        /*
        add information
         */
        $(space + '.label-nom-client').text($client);
        $(space + '.label-magasin').text($magasin);
        $(space + '.label-utilisateur').text($user);
        $somme = 0;
        $(namespace + '#table-liste-article-vente tbody tr').each(function (index, tr) {
            $array = [$(tr).children().eq(0).text(), $(tr).children().eq(1).text(), $(tr).children().eq(2).text(), $(tr).children().eq(3).text(), $(tr).children().eq(4).text()]
            push_to_table_list(space + '#table-liste-ventes', '', $array)
            $somme += parseFloat($(tr).children().eq(4).text());
        })
        $(space + '.label-subtotal-vente').text($somme + 'Ar');
        $(space + '.label-total-vente').text($somme + 'Ar');
        $(space + '.label-somme-en-lettre').text(NumberToLetter($somme) + ' ariary');
        // print
        $(space).printThis();

    }
    function generer_facture() {
        let space = namespace + '#impression-facture-vente ';
        /*
        vider la table
         */
        $(space + '#table-liste-ventes tbody tr').remove()

        /*
        information facture
         */
        $client = $(namespace + "#name-client").val();
        $magasin = $(namespace + "#select-magasin option:selected").text();
        $user = $(namespace + '#user-id').attr('value-id');
        /*
        add information
         */
        $(space + '.label-nom-client').text($client);
        $(space + '.label-magasin').text($magasin);
        $(space + '.label-utilisateur').text($user);
        $somme = 0;
        $(namespace + '#table-liste-article-vente tbody tr').each(function (index, tr) {
            $array = [$(tr).children().eq(0).text(), $(tr).children().eq(1).text(), $(tr).children().eq(2).text(), $(tr).children().eq(3).text(), $(tr).children().eq(4).text()]
            push_to_table_list(space + '#table-liste-ventes', '', $array)
            $somme += parseFloat($(tr).children().eq(4).text());
        })

        $(space + '.label-subtotal-vente').text($somme + 'Ar');
        $(space + '.label-total-vente').text($somme + 'Ar');
        $(space + '.label-somme-en-lettre').text(NumberToLetter($somme) + ' ariary');

        // print
        $(space).printThis()
    }
    function updateLabelFooter() {
        $countArticle = $(namespace + '#table-liste-article-vente tbody tr').length;
        $sommeMontant = 0
        $(namespace + '#table-liste-article-vente tbody tr').each(function (key, value) {
            $sommeMontant += parseFloat($(value).children().eq(4).text());
        })
        $(namespace + '.label-nombre-article').text($countArticle)
        $(namespace + '.label-somme-ariary').text($sommeMontant)
        $(namespace + '.label-somme-fmg').text($sommeMontant * 5)
    }
    /*
    *  RECHERCHER  ARTICLE
    * */
    let item_tab = [];
    const LIST_ITEM_TABLE = namespace+"#table-liste-article";
    const INPUT_ITEM_SEARCH = namespace+"#inpute-article-search";
    init_input_search_keyup("ARTICLE",
        INPUT_ITEM_SEARCH,
        LIST_ITEM_TABLE,
        $filiale_id
        ,item_tab);
    $(namespace+"#btn-search-article").click(()=>{
        let url = "http://localhost:8080/api/v1/subsidiaries/"+$filiale_id+"/itemsInfo/";
        if (item_tab.length===0) fetch_item(url,item_tab,LIST_ITEM_TABLE,"ARTICLE")
    })
    /*
    * RECHERCHER CLIENT
    * */
    // let client_tab = [];
    // const LIST_CLIENT_TABLE = namespace+"#table-liste-client";
    // const INPUT_CLIENT_SEARCH = namespace+"#input-client-search";
    // init_input_search_keyup("CLIENT",
    //     INPUT_CLIENT_SEARCH,
    //     LIST_CLIENT_TABLE,
    //     $filiale_id,
    //     client_tab);
    $(namespace+"#btn-search-client").click(()=>{
        let url = "http://localhost:8080/api/v1/externalEntities/0/"+$filiale_id;
        if (client_tab.length===0) fetch_item(url,client_tab,LIST_CLIENT_TABLE,"CLIENT")
    })
})