$(function() {
    // click of tr, open infos list articles in facture
    $('.table-facture tbody tr').click(function() {
        // get reference of selected facture
        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $("#facture-info").addClass("show")

    })

    // fermer l'info listes article facture
    $('.btn-close-info-facture').click(function() {
        $('#facture-info').removeClass("show")
    })

    // double click of tr, open facture info
    $('.table-facture tbody tr').dblclick(function() {
        // get reference of dblcliked facture
        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $('#info-facture').modal('show')
    })

    // avoir
    $('.btn-avoir').click(function() {
        console.log('btn voir facture')
        $('#avoir-facture').modal('show')
    })

})