$(function() {

    /*

    MENU CHOIX MAGASIN

     */

    let namespace = "#choix-magasin ";

    $(namespace + ".btn-choix-magasin").on('click', function() {

        $magasin = $(namespace + '#choixMagasin option:selected');

        createToast('bg-success', 'uil-check-file', 'Magasin changer', 'Votre magasin a ete change a ' + $magasin.text() + '!!')
    })
})