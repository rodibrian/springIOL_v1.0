$(function () {
    let total_montant_avoir=0;
    let namespace = "#menu-facture ";
    /*---------------------------------
                MENU FACTURE
     ----------------------------------*/
    exportToExcel(namespace + '.btn-export-to-excel','factures-' , namespace + '.table-facture')
    /*
     click of tr, open infos list articles in facture
     */
    /*
    MENU FACTURE
     */
    // click of tr, open infos list articles in facture
    function fetchFactureInfo(reference) {
        let url = "http://localhost:8080/api/v1/sales/" + reference;
        execute_ajax_request("get", url, null, (vente) => {
            $(namespace + "#table-facture-avoir tbody").empty();
            let info_article_magasin_tab = vente.infoArticleMagasin;
            $.each(info_article_magasin_tab,(key, info) => {
                let tr = [
                    `
                          <div class="form-checkbox form-checkbox-danger">
                            <input id="" type="checkbox" class="form-check-input avoir-checkbox" style="display: none" checked>
                          </div>
                    `,
                    info.article.designation,
                    info.unite.designation,
                    (vente.montantVente / info.quantiteAjout),
                    info.quantiteAjout,
                    vente.montantVente
                ];
                let row_id = info.magasin.id+"-"+info.article.id+"-"+info.unite.id;
                push_to_table_list(namespace + "#table-facture-avoir",row_id,tr);
            });
            $(namespace+"#info-facture").attr("vente-id",vente.id);
        });
    }

    $(document).on('dblclick',namespace + '.table-facture tbody tr',function () {
        // get reference of dblcliked facture
        let reference = $(this).children()[0].innerText;
        // get reference of selected facture
        let client = $(this).children()[1].innerText;
        let montant = $(this).children()[2].innerText;
        let operateur = $(this).children()[3].innerText;
        let date  = $(this).children()[4].innerText;
        fetchFactureInfo(reference);
        // hide avoir
        $(namespace + '.avoir-checkbox').hide();
        $(namespace + '.avoir-checkbox-all').hide();
        $(namespace + '.avoir-checkbox').prop('checked', true)
        $(namespace + '.avoir-checkbox-all').prop('checked', true)
        $(namespace + '.btn-valider-avoir').hide();
        // initialisation de information du detail facture
        $(namespace+"#num-facture").text(" Réference : "+reference);
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

    function get_data_from_table_avoir(ref,date) {
        let tab = [];
        let tr_tab = $(namespace + '#table-facture-avoir tbody tr');
        let user_id = $(namespace+"#user-id").attr("value-id");
        total_montant_avoir = 0;
        $.each(tr_tab,(key,value)=>{
            if ($(value).find('.avoir-checkbox').is(':checked')){
                let info = {};
                let row_id = $(value).attr("id");
                let split = row_id.split("-");
                let magasin_id = split[0];
                let article_id = split[1];
                let unite_id = split[2];
                let montant = $(value).children().eq(5).text();
                let quantite = $(value).children().eq(3).text();
                total_montant_avoir+=montant;
                info.typeOperation = "AVOIR";
                info.magasin = {id: magasin_id};
                info.user = {id: user_id};
                info.unite = {id: unite_id};
                info.article = {id: article_id}
                info.quantiteAjout = quantite;
                info.date = date;
                info.reference = ref;
                tab.push(info);
            }
        })
        console.log(tab);
        return tab;
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
            .on("click", function () {
                let vente_id= $(namespace+"#info-facture").attr("vente-id");
                let date = new Date();
                let ref = create_reference("AVOIR",date);
                let invoice_regulation = {};
                invoice_regulation.vente= {id:vente_id};
                invoice_regulation.refAvoir = ref;
                invoice_regulation.infoArticleMagasin = get_data_from_table_avoir(ref,date);
                invoice_regulation.montant = total_montant_avoir;
                let url = "http://localhost:8080/api/v1/regulations";
                execute_ajax_request("post",url,invoice_regulation,(data)=>{
                    // effectué operation AVOIR
                    createToast('bg-danger', 'uil-trash-alt','Avoir valid&eacute;','Avoir effectu&eacute; avec success!')
                    hideAndRemove('#' + $modalId)
                })
            })
    })

})