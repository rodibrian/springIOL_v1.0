$(function () {
    /* -------------------------------------------------------------------------------
                                       MENU VENTE SCRIPT
    -------------------------------------------------------------------------------- */
    let namespace = "#menu-vente ";
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
        let article_id = $(this).attr("id");
        let unite_id = $(this).children().eq(1).attr("value-id");
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        get_select_affect_to_input(namespace + '#designation-article', article_id, $(this).children().eq(1).text());
        $(namespace + '#modal-liste-article').modal('hide');
        set_select_option_value([unite_id, $(this).children().eq(1).text()], namespace + "#input-unite-article");
        updatePrixUnitaire(article_id,unite_id,filialeId);
        get_select_affect_to_input(namespace + "#input-prix-unitaire", "", $(this).children().eq(5).text())
        // après selection article, select * unite de l'article
        // ainsi que son prix
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
        $(namespace + '#modal-prix-special').modal('hide')
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
    $('.btn-ajouter-article-vente').on('click', function (){
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
               let magasin_id = split[0];
               let article_id = split[1];
               let unite_id = split[2];
               let info = {};
               let quantite = $(value).children().eq(2).text();
               info.typeOperation = "VENTE";
               info.magasin = {id: magasin_id};
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
                let user_id = $(namespace + '#user-id').attr("value-id");
                let date = new Date();
                let ref = create_reference("VENTE",date);
                let $vente = {};
                $vente.infoArticleMagasin = getDataFromTable(ref,date,user_id);
                $vente.client = {id: $clientId};
                $vente.montantVente = $sommeMontant;
                $vente.refVente = ref;
                $vente.remise = 0;
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
    function generer_ticket() {
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
   *  RECHERCHER ARTICLE
   */
   let item_tab = [];
    function appendDataToTable(data){
        $(namespace + "#table-liste-article tbody").empty();
        $.each(data, (key, value) => {
            let tr = `
                            <tr id ="` + value.itemId + `">
                                <td>` + value.itemName + `</td>
                                <td value-id ="` +value.uniteId+ `">` + value.uniteName + `</td>
                                <td>` + value.stock + `</td>
                                <td>` + value.price + `</td>
                            </tr>
                     `;
            $(namespace + "#table-liste-article tbody").append(tr);
            let map = [tr,value];
            if (item_tab.length===0) item_tab.push(map);
            else {
                let finded_item = item_tab.find(item => (item[1].itemId === value.itemId && item[1].uniteId ===value.uniteId ) );
                if (finded_item=== undefined) item_tab.push(map);
            }
        })
    }
    function find_item(item_name) {
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        let url = "http://localhost:8080/api/v1/subsidiaries/" + filialeId + "/itemsInfo/" + item_name;
        execute_ajax_request("get", url, null, (data) => appendDataToTable(data))
    }

    $(document).on("keyup",namespace+"#inpute-article-search",()=>{
       let item_name = $(namespace+"#inpute-article-search").val().toLowerCase().trim();
       if (item_name!==''){
           if (item_tab.length===0) find_item(item_name);
           else{
               let finded_item = item_tab.find(item => item[1].itemName.toLowerCase().trim().search(item_name)!==-1);
               if (finded_item !== undefined && finded_item !== null){
                   $(namespace + "#table-liste-article tbody").empty();
                   $(namespace + "#table-liste-article tbody").append(finded_item[0]);
               }else find_item(item_name);
           }
       }else if (item_tab.length!==0){
           $(namespace + "#table-liste-article tbody").empty();
           item_tab.forEach(value => $(namespace+"#table-liste-article tbody").append(value[0]));
       }
   })
    /*
    *  RECHERCHER  ARTICLE
    * */
    $(namespace+"#btn-search-article").click(()=>{
        if (item_tab.length===0){
            let filialeId = $(namespace + '#filiale-id').attr("value-id");
            let url = "http://localhost:8080/api/v1/subsidiaries/"+filialeId+"/itemsInfo/";
            execute_ajax_request("get", url, null, (data) => appendDataToTable(data))
        }
    })
    /*
    * RECHERCHER CLIENT
    * */
    let client_tab = [];

    function append_client(data) {
        $(namespace + "#table-liste-client tbody").empty();
        data.forEach(cf => {
            let tr = `
                            <tr id="` + cf.id + `">
                              <td>` + cf.nom + `</td>
                              <td>` + cf.adresse + `</td>
                              <td>` + cf.numTel + `</td>
                            </tr>
                    `;
            let map = [tr, cf];
            $(namespace + "#table-liste-client tbody").append(tr);
            if (client_tab.length === 0) client_tab.push(map);
            else {
                let finded_client = client_tab.find(map => map[1].id === cf.id);
                if (finded_client === undefined) client_tab.push(map);
            }
        })
    }

    $(namespace+"#btn-search-client").click(()=>{
        if (client_tab.length===0){
            let filialeId = $(namespace + '#filiale-id').attr("value-id");
            let url  = "http://localhost:8080/api/v1/externalEntities/0/"+filialeId;
            execute_ajax_request('get',url,null,(data)=> append_client(data))
        }
    })
})