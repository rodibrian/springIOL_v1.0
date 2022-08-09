$(function () {

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
        execute_ajax_request("get", url, null, (data) => {
            $(namespace + "#table-facture-avoir tbody").empty();
            $.each(data, (key, value) => {
                let tr = [
                    `
                          <div class="form-checkbox form-checkbox-danger">
                            <input id="" type="checkbox" class="form-check-input avoir-checkbox" style="display: none" checked>
                          </div>
                    `,
                    value.infoArticleMagasin.article.designation,
                    value.infoArticleMagasin.unite.designation,
                    (value.montantVente / value.infoArticleMagasin.quantiteAjout),
                    value.infoArticleMagasin.quantiteAjout,
                    value.montantVente
                ];
                push_to_table_list(namespace + "#table-facture-avoir", value.id, tr);
            });
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
        $(namespace + '#info-facture').modal('show')
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

    /*
     validation avoir
     */
    $(namespace + '.btn-valider-avoir').on('click', function() {
        $sommeAvoir = 0;
        $(namespace + '#table-facture-avoir tbody tr').each(function(key,value) {
            if ($(value).find('.avoir-checkbox').is(':checked'))
                $sommeAvoir += parseFloat($(value).children().eq(4).text().replace('Ar',''))
        })
        $content = 'Voulez vous vraiment valider cette avoir ?' +
            '<li> Nombre article annulé: ' + $(namespace + '.avoir-checkbox:checked').length + '</li>' +
            '<li> Somme à rembourser: ' + $sommeAvoir + ' Ar</li>';

        $modalId = "modal-confirm-avoir";
        create_confirm_dialog('Confirmation avoir', $content,$modalId,'Oui, valider!','btn-danger')
            .on("click", function () {
                // effectué operation AVOIR
                createToast('bg-danger', 'uil-trash-alt','Avoir valid&eacute;','Avoir effectu&eacute; avec success!')
                hideAndRemove('#' + $modalId)

                $(namespace + '#table-facture-avoir tbody tr').each(function(key,value) {
                    if ($(value).find('.avoir-checkbox').is(':checked')){
                        let montant = $(value).children().eq(4).text();

                    }
                })

            })
    })

})