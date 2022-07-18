$(function() {
    /*

    MAIN JS
     */

    $('.table-special-form').parent().addClass('table-special-form-parent');

    if ($('#navigation-ul .side-nav-link.active').text() != '')
        $('title').text('IOL - ' + $('#navigation-ul .side-nav-link.active').text())
    else
        $('title').text('IOL - ' + $('.no-title').attr('title'))

})