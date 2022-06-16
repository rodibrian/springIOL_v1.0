$(function () {

    let namespace = "#menu-client ";

    // click of tr, open infos list articles in facture

    $(namespace + '#table-client tbody tr').click(function () {

        // get reference of selected facture
        
        let reference = $(this).children()[0].innerText;
        console.log(reference)

        $(namespace + "#info-credit").addClass("show")

    })

    // fermer l'info listes article facture

    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })
})