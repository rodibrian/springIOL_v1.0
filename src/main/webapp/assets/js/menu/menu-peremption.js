$(function () {

    let namespace = "#menu-peremption ";

    $(namespace + '.table-peremption tbody tr').dblclick(function () {

        // get code of current article

        let code = $(this).children()[0].innerText;

        $(namespace + '#date-peremption').modal('show')
    })

})