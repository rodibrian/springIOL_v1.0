$(function () {
    /*---------------

        MAIN JS

    -------------- */

    // conversion to excel

    $('.table-special-form').parent().addClass('table-special-form-parent');

    if ($('#navigation-ul .side-nav-link.active').text() != '')
        $('title').text('IOL - ' + $('#navigation-ul .side-nav-link.active').text())
    else
        $('title').text('IOL - ' + $('.no-title').attr('title'))

        (function () {
            'use strict'
            const forms = document.querySelectorAll('.was-validated')
            Array.from(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })()
})