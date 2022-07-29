$(function() {
    $.each($operationlistes, function(key, value) {
        push_to_table_list(namespace + ".table-liste-operation", key,
            [value.reference, value.designation, value.operation, value.operation === IN ? value.quantite : 0, value.operation === OUT ? value.quantite : 0, value.quantite, value.description, value.dateOperation ,value.operateur])
    })
})