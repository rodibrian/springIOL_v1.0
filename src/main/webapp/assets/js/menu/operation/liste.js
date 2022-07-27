$(function() {
    /*
    =
    LISTES OPERATION

     */

    let namespace = "#liste-operation ";


    exportToExcel('operations', namespace + '.table-liste-operation')

    let IN = "ENTREE", OUT = "SORTIE";

    // données prédéfinis

    $operationlistes = [
        {
            reference : "ref-123",
            designation : "bonbon",
            operation: IN,
            quantite : 10,
            dateOperation : new Date().toLocaleDateString(),
            description : "aucun description",
            operateur : "Admin"
        },
        {
            reference : "ref-456",
            designation : "biscuit petits beurre",
            operation: OUT,
            quantite : 5,
            dateOperation : new Date().toLocaleDateString(),
            description : "gouter des enfants",
            operateur : "Patron"
        },
        {
            reference : "ref-789",
            designation : "gouty d'or",
            operation: IN,
            quantite : 100,
            dateOperation : new Date().toLocaleDateString(),
            description : "aucun description",
            operateur : "Magasinier"
        }
    ]

    // REchargement de la table

    $.each($operationlistes, function(key, value) {
        push_to_table_list(namespace + ".table-liste-operation", key,
            [value.reference, value.designation, value.operation, value.operation === IN ? value.quantite : 0, value.operation === OUT ? value.quantite : 0, value.quantite, value.description, value.dateOperation ,value.operateur])
    })

})