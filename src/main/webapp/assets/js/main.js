$(function() {
    /*

    MAIN JS
     */
    $('.table-special-form').parent().addClass('table-special-form-parent');
    let user_id = $("#user-id").attr("value-id");

    $('.nav-operation li a').on('click', function () {
        console.log($('#user-id').attr('value-id'))
    })
})