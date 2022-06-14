$(function () {

    // click of tr

    $('.table-stock tr').click(function () {

    })

    $('.s-value').hide();

    // click stock en valeur
    
    $('.btn-stock-valeur').click(function () {
        $('.s-value').toggle();
        $('.s-no-value').toggle();
    });

    $('.btn-stock-valider').click(function () {
        $('.btn-stock-valeur').click();
    })

})