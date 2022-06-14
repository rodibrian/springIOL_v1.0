$(function () {
    $('.table-peremption tbody tr').dblclick(function () {

        // get code of current article

        let code = $(this).children()[0].innerText;
        console.log(code)

        $('#date-peremption').modal('show')
    })

})