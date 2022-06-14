$(function () {

    // double click of tr, open facture info

    $('.table-prix tbody tr').dblclick(function () {

        // get code article when dblcliked article
        
        let code = $(this).children()[0].innerText;
        console.log(code)

        $('#info-prix').modal('show')
    })


})