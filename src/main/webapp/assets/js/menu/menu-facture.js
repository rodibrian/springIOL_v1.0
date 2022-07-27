$(function () {

    let namespace = "#menu-facture ";

    /*
    MENU FACTURE
     */

    exportToExcel('factures-' , namespace + '.table-facture')

    // click of tr, open infos list articles in facture

    $(namespace + '.table-facture tbody tr').click(function () {

        // get reference of selected facture

        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $(namespace + "#facture-info").addClass("show")

    })

    $(document).on('click', namespace + '.table-facture a.info-facture', function() {
        $('#facture-info').addClass('show')
    })

    // fermer l'info listes article facture

    $(namespace + '.btn-close-info-facture').click(function () {
        $(namespace + '#facture-info').removeClass("show")
    })

    // double click of tr, open facture info

    $(namespace + '.table-facture tbody tr').dblclick(function () {

        // get reference of dblcliked facture

        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $(namespace + '#info-facture').modal('show')
    })

    // avoir

    $(namespace + '.btn-avoir').click(function () {
        console.log('btn voir facture')
        $(namespace + '#avoir-facture').modal('show')
    })

    // chargement des données de la table


    // validation avoir

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