$(function () {
    let namespace = "#menu-facture ";
    /*---------------------------------
                MENU FACTURE
     ----------------------------------*/
    $filiale_id = $(namespace + '#filiale-id').attr("value-id");
    exportToExcel(namespace + '.btn-export-to-excel','factures-' , namespace + '.table-facture')
    /*
     click of tr, open infos list articles in facture
     */
    /*
    MENU FACTURE
     */
    function on_invoice_info_fetched(vente) {
        $(namespace + "#table-facture-avoir tbody").empty();
        let info_article_magasin_tab = vente.infoArticleMagasin;
        $.each(info_article_magasin_tab, (key, info) => {
            let tr = [
                `
                          <div class="form-checkbox form-checkbox-danger">
                            <input id="" type="checkbox" class="form-check-input avoir-checkbox" style="display: none" checked>
                          </div>
                    `,
                info.article.designation,
                info.unite.designation,
                info.quantiteAjout,
                (vente.montantVente / info.quantiteAjout),
                vente.montantVente
            ];
            let row_id = info.magasin.id + "-" + info.article.id + "-" + info.unite.id;
            push_to_table_list(namespace + "#table-facture-avoir", row_id, tr);
        });
        $(namespace + "#info-facture").attr("vente-id", vente.id);
    }

// click of tr, open infos list articles in facture
    function fetchFactureInfo(reference) {
        var url = "http://localhost:8080/api/v1/sales/" + reference;
        execute_ajax_request("get", url, null, (vente) => {
            if (vente.infoArticleMagasin.length>0){
                on_invoice_info_fetched(vente);
                let vente_id= $(namespace+"#info-facture").attr("vente-id");
                url ="http://localhost:8080/api/v1/regulations/"+vente_id;
                execute_ajax_request("get",url,null,(not_exist)=>{
                      if (not_exist) $(namespace+".btn-creer-avoir").show();
                      else  $(namespace+".btn-creer-avoir").hide();
                });
            }
        });
    }

    $(document).on('dblclick',namespace + '.table-facture tbody tr',function () {
        // get reference of dblcliked facture
        $reference = $(this).children()[0].innerText;
        // get reference of selected facture
        let client = $(this).children()[1].innerText;
        let montant = $(this).children()[2].innerText;
        let operateur = $(this).children()[3].innerText;
        let date  = $(this).children()[4].innerText;
        fetchFactureInfo($reference);
        // hide avoir
        $(namespace + '.avoir-checkbox').hide();
        $(namespace + '.avoir-checkbox-all').hide();
        $(namespace + '.avoir-checkbox').prop('checked', true)
        $(namespace + '.avoir-checkbox-all').prop('checked', true)
        $(namespace + '.btn-valider-avoir').hide();
        // initialisation de information du detail facture
        $(namespace+"#num-facture").text(" Réference : "+$reference);
        $(namespace+"#montant-facture").text(" Montant : "+montant);
        $(namespace+"#mode-payement").text("Mode de payement : ESPECE");
        $(namespace+"#client-facture").text("Client :"+client);
        $(namespace+"#date-facture").text(" Date facture : "+date);
        $(namespace+"#operateur-facture").text("Operateur :"+operateur);
        $(namespace + '#info-facture').modal('show');
    })
    /*
    créer un avoir
     */
    $(namespace + '.btn-creer-avoir').on('click', function() {
        $(namespace + '.avoir-checkbox-all').toggle();
        $(namespace + '.avoir-checkbox').toggle();
        $(namespace + '.btn-valider-avoir').toggle();
    })
    $(namespace + '.avoir-checkbox-all').on('change', function() {
        $(namespace + '.avoir-checkbox').prop('checked', $(this).is(':checked'))
    })
    
    function get_data_from_table_avoir(ref,date){
        let tab = [];
        let tr_tab = $(namespace + '#table-facture-avoir tbody tr');
        $user_id = $(namespace+"#user-id").attr("value-id");
        total_montant_avoir = 0;
        $.each(tr_tab,(key,value)=>{
            if ($(value).find('.avoir-checkbox').is(':checked')){
                let info = {};
                let row_id = $(value).attr("id");
                let split = row_id.split("-");
                $magasin_id = split[0];
                let article_id = split[1];
                let unite_id = split[2];
                let quantite = $(value).children().eq(3).text();
                info.typeOperation = "AVOIR";
                info.magasin = {id:$magasin_id};
                info.user = {id: $user_id};
                info.unite = {id: unite_id};
                info.article = {id: article_id}
                info.quantiteAjout = quantite;
                info.description = " avoir sur la facture N°"+$reference;
                info.date = date;
                info.reference = ref;
                tab.push(info);
            }
        })
        return tab;
    }

    function persit_invoice() {
        let vente_id = $(namespace + "#info-facture").attr("vente-id");
        let date = new Date();
        let ref = create_reference("AVOIR", date);
        $filiale_id = $(namespace + '#filiale-id').attr("value-id");
        $user_id = $(namespace + "#user-id").attr("value-id");
        let invoice_regulation = {};
        let ifc = {};
        ifc.operationCaisse = "AVOIR";
        ifc.montantOperation = $sommeAvoir;
        ifc.date = date;
        ifc.reference = ref;
        ifc.modePayement = "ESPECE";
        ifc.user = {id: $user_id};
        ifc.filiale = {id: $filiale_id};
        ifc.description = " avoir sur la facture " + ref;
        invoice_regulation.vente = {id: vente_id};
        invoice_regulation.refAvoir = ref;
        invoice_regulation.infoArticleMagasin = get_data_from_table_avoir(ref, date);
        invoice_regulation.montant = $sommeAvoir;
        invoice_regulation.infoFilialeCaisse = ifc;
        let url = "http://localhost:8080/api/v1/regulations";
        execute_ajax_request("post", url, invoice_regulation, (data) => {
            // effectué operation AVOIR
            createToast('bg-danger', 'uil-trash-alt', 'Avoir valid&eacute;', 'Avoir effectu&eacute; avec success!')
            hideAndRemove('#' + $modalId)
            $(namespace + ".btn-creer-avoir").click();
            $(namespace + ".btn-creer-avoir").hide();
        })
    }

    /*
             validation avoir
        */
    $(namespace + '.btn-valider-avoir').on('click',function(){
        $sommeAvoir = 0;
        $(namespace + '#table-facture-avoir tbody tr').each(function(key,value) {
            if ($(value).find('.avoir-checkbox').is(':checked'))
                $sommeAvoir += parseFloat($(value).children().eq(5).text().replace('Ar',''))
        })
        $content = 'Voulez vous vraiment valider cette avoir ?' +
            '<li> Nombre article annulé: ' + $(namespace + '.avoir-checkbox:checked').length + '</li>' +
            '<li> Somme à rembourser: ' + $sommeAvoir + ' Ar</li>';
        $modalId = "modal-confirm-avoir";
        create_confirm_dialog('Confirmation avoir', $content,$modalId,'Oui, valider!','btn-danger')
            .on("click", function (){
                persit_invoice();
            })
    })

})