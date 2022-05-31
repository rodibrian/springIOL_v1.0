$(function () {

    // tout les champ non editable par defaut

    $('#table-unite input').attr('disabled', '')


    let categorieUrl = 'http://localhost:8080/api/v1/categories';

    // ajout du nouveau unite
    $("#btn-new-unite").click(
        function () {
            let table = $("#table-unite tbody");
            let length = $("#table-unite tbody tr").length;
            length++;
            // cacher le enregistrement
            $("#table-unite tbody tr th a.btn-success").hide();
            $('#table-unite input').attr('disabled', '')

            // cacher edition et suppression du dernier
            $("#table-unite tbody tr th #edit_" + length).hide();
            $("#table-unite tbody tr th #del_" + length).hide();
            let tr = `<tr>
                            <th><input type="text" id="code_` + length + `" class="form-control input-sm" value="000"></th>
                            <th><input type="text" id="niveau_` + length + `" class="form-control input-sm" value="0"></th>
                            <th><input type="text" id="designation_` + length + `" class="form-control input-sm" value="designation"></th>
                            <th><input type="text" id="quantite_` + length + `" class="form-control input-sm" value="0"></th>
                            <th><input type="text" id="poids_` + length + `" class="form-control input-sm" value="0Kg"></th>
                            <th class="d-inline-flex">
                                <a class="btn btn-primary btn-sm btn-edit-unite" id="edit_` + length + `"><i class="uil-pen"></i></a>&nbsp;
                                <a class="btn btn-danger btn-sm btn-del-unite" id="del_` + length + `"><i class="uil-trash-alt"></i></a>&nbsp;
                                <a class="btn btn-success btn-sm btn-add-unite" id="add_` + length + `"><i class="uil-check-square"></i></a>
                            </th>
                        </tr>`;
            table.append(tr);
        }
    )

    // edition ou enregistrement enregistrement

    $('#table-unite').on('click', '.btn-add-unite', (function () {
        $(this).closest('tr').find('input').attr('disabled', '');
        $(this).hide();

        console.log($(this).attr('id'))
    }))

    //suppression unite

    $('#table-unite').on('click', '.btn-del-unite', (function () {
        $(this).closest('tr').remove();

        console.log($(this).attr('id'))
    }))

    // edition d'une unite

    $('#table-unite').on('click', '.btn-edit-unite', (function () {
        $(this).closest('tr').find('input').removeAttr('disabled')
        $(this).closest('tr').find('.btn-add-unite').show()

        console.log($(this).attr('id'))

    }));

    // click tr

    //$("#tmp").css('background-color','red');


    $("#newArticleBtn").click(()=>{
        let tdElement = $("#categorieTabList tbody tr td:first-child");
        let select = $(".form-select");
        if (tdElement.length!==0){
            for (let i = 0 ; i < tdElement.length; i++){
                let text = tdElement[i].innerText;
                let id = $(tdElement[i]).parent().attr("id");
                let option = `<option value="`+id+`">`+text+`</option>`
                select.append(option);
            }
        }else {

            $.ajax({
                type: 'GET',
                url: categorieUrl,
                success: function (categories){
                    for (let i = 0 ; i < categories.length; i++){
                        let option = `<option value="`+categories[i].id+`">`+categories[i].libelle+`</option>`
                        select.append(option);
                    }
                }
            });

        }
    });
});