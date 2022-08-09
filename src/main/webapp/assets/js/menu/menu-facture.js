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
    let url = "http://localhost:8080/api/v1/sales/";
    const fetchBillsData = (reference)=>{
        $.ajax({
            type : "get",
            url : url+reference,
            contentType : "application/json",
            success : (data)=>{
                $(namespace+"#facture-details-tab tbody tr").empty();
                $.each(data,(key,value)=>{
                    let tr = [
                        value.infoArticleMagasin.article.designation,
                        value.infoArticleMagasin.unite.designation,
                        (value.montantVente/value.infoArticleMagasin.quantiteAjout),
                        value.infoArticleMagasin.quantiteAjout,
                        value.montantVente
                    ];
                    push_to_table_list(namespace+"#facture-details-tab",key,tr);
                })
            }
        })
    }

    $(namespace + '.table-facture tbody tr').click(function () {

        // get reference of selected facture
        let reference = $(this).children()[0].innerText;
        let client = $(this).children()[1].innerText;
        let montant = $(this).children()[2].innerText;
        let operateur = $(this).children()[3].innerText;
        let date  = $(this).children()[4].innerText;

        $(namespace+"#num-facture").text(" Réference : "+reference);
        $(namespace+"#montant-facture").text(" Montant : "+montant);
        $(namespace+"#mode-payement").text("Mode de payement : ESPECE");
        $(namespace+"#client-facture").text("Client :"+client);
        $(namespace+"#date-facture").text(" Date facture : "+date);
        $(namespace+"#operateur-facture").text("Operateur :"+operateur);

        fetchBillsData(reference);

    })

    $(document).on('click', namespace + '.table-facture a.info-facture', function() {
        $('#facture-info').addClass('show')
    })

    /*
     fermer l'info listes article facture
     */

    $(namespace + '.btn-close-info-facture').click(function () {
        $(namespace + '#facture-info').removeClass("show")
    })

    /*
     double click of tr, open facture info
     */

    $(namespace + '.table-facture tbody tr').dblclick(function () {

        // get reference of dblcliked facture

        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $(namespace + '#info-facture').modal('show')
    })

    /*
     avoir
     */

    $(namespace + '.btn-avoir').click(function () {
        console.log('btn voir facture')
        $(namespace + '#avoir-facture').modal('show')
    })

    /*
     chargement des données de la table
     */


    /*
     validation avoir
     */

    $(namespace + '#avoir-facture #btn-valider-avoir').on('click', function() {
        $modalId = 'validation-avoir';

        create_confirm_dialog('Confirmation avoir', 'Voulez vous vraiment valider cette avoir ?',$modalId,'Oui, valider!','btn-danger')
            .on('click', function () {
                createToast('bg-danger', 'uil-trash-alt','Avoir valid&eacute;','Avoir effectu&eacute; avec success!')

                hideAndRemove('#' + $modalId)

                $('#avoir-facture').modal('hide')
            })

    })


})