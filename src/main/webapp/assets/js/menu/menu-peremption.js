$(function () {

    let namespace = "#menu-peremption ";


    exportToExcel(namespace + '.btn-export-to-excel','peremptions', namespace + '.table-peremption')

    $(document).on('dblclick',namespace + '.table-peremption tbody tr',function () {

        // get code of current article

        let tr = $(this);

        $(namespace + '#date-peremption').modal('show')

        // enregistrement du date de peremption

        $(namespace + "#date-peremption #btn-enregistrer-date-peremption").on('click', function() {
            $datePeremption = $(namespace + '#date-peremption #input-date-peremption').val();
            $(tr).children().eq(4).text(new Date($datePeremption).toLocaleDateString())
            $(tr).children().eq(5).text(setLabelPeremption(new Date($datePeremption)))
        })
    })

    // ajouter un article à peremption

    $(document).on('dblclick', namespace + "#modal-liste-article tbody tr", function() {
        $article = $(this);

        push_to_table_list(namespace + ".table-peremption", $article.children().eq(0).text(),
            [$article.children().eq(0).text(), $article.children().eq(1).text(), $article.children().eq(2).text(), $article.children().eq(3).text(), new Date().toLocaleDateString(), setLabelPeremption( new Date()) ])

        $(namespace + "#modal-liste-article").modal('hide')
    })

    // ajouter bouton date de peremption


    function setLabelPeremption($datePeremption) {
        if ($datePeremption > new Date())
            return $('<span class="badge badge-primary-lighten">Forte</span>').html()
        return $('<span class="badge badge-danger-lighten">p&eacute;rim&eacute;</span>').html()
    }



})