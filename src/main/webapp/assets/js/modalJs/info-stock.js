$(function() {

    /* -------------------------

            INFO STOCK

     ---------------------------*/

    let namespace = "#info-stock "

    // update info stock

    $(namespace + '.btn-update-stock').on('click', function() {
        $('#modal-inventaire-stock').modal('show');

        // valeur stock
        $('#modal-inventaire-stock #input-quantite-stock').val(parseInt($('#info-stock p.label-stock-initial-article').text()))

    })

    // update inventaire stock

})