$(function () {

    /*-------------------------

        NOUVEAU MAGASIN

     --------------------------*/


    let namespace = "#new-magasin ";

    $("#saveMagasinBtn").click(function () {

        let nom_magasin = $("#nomMagasin").val();
        let addresse_magasin = $("#adresseMagasin").val();
        let filialeId = 1;
        let magasin = {
            adresse : addresse_magasin,
            nomMagasin : nom_magasin,
            filiale : {
                id : filialeId
            }
        }
    })

})