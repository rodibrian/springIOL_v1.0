$(function () {
    // click of tr, open infos list articles in facture
    $('#table-client tbody tr').click(function () {
        // get reference of selected facture
        let reference = $(this).children()[0].innerText;
        console.log(reference)
        $("#info-credit").addClass("show")

    })

    // fermer l'info listes article facture

    $('.btn-close-info-credit').click(function () {
        $('#info-credit').removeClass("show")
    })
})