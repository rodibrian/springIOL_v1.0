$(function () {
    let isCreateAction = true;
    // tout les champ non editable par defaut
    $('#table-unite input').attr('disabled', '')
    let categorieUrl = 'http://localhost:8080/api/v1/categories';
    // ajout du nouveau unite
    $("#btn-new-unite").click(
        function () {
            let table = $("#table-unite tbody");
            let length = $("#table-unite tbody tr").length;
            // cacher le enregistrement
            $("#table-unite tbody tr th a.btn-success").hide();
            $('#table-unite input').attr('disabled', '')

            // cacher edition et suppression du dernier
            $("#table-unite tbody tr th #edit_" + length).hide();
            $("#table-unite tbody tr th #del_" + length).hide();
            let tr = `<tr>
                            <td><input type="text"  class="form-control input-sm" value="000"></td>
                            <td><input type="text"  class="form-control input-sm" value="0"></td>
                            <td><input type="text"  class="form-control input-sm" value="designation"></td>
                            <td><input type="text"  class="form-control input-sm" value="0"></td>
                            <td><input type="text"  class="form-control input-sm" value="0Kg"></td>
                            <td class="d-inline-flex">
                                <a class="btn btn-primary btn-sm btn-edit-unite"><i class="uil-pen"></i></a>&nbsp;
                                <a class="btn btn-danger btn-sm btn-del-unite"><i class="uil-trash-alt"></i></a>&nbsp;
                                <a class="btn btn-success btn-sm btn-add-unite"><i class="uil-check-square"></i></a>
                            </td>
                        </tr>`;
            table.append(tr);
        }
    )
    // edition ou enregistrement enregistrement
    $('#table-unite').on('click', '.btn-add-unite', (function () {
        $(this).closest('tr').find('input').attr('disabled', '');
        $(this).hide();
    }))
    //suppression unite
    $('#table-unite').on('click', '.btn-del-unite', (function () {
        $(this).closest('tr').remove();
    }))
    // edition d'une unite
    $('#table-unite').on('click', '.btn-edit-unite', (function () {
        $(this).closest('tr').find('input').removeAttr('disabled')
        $(this).closest('tr').find('.btn-add-unite').show()
    }));

    // chargement des categories lors de l'affichage du formulaire de categorie
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
    // enregistrement de l'article
    $("#saveArticleBtn").click(()=>{
        const UNITE_TAB_SIZE = 4;
        let designation = $("#designation").val();
        let categorieId = $("#categorie option:selected").val();
        let tr = $('#table-unite tbody tr');
        let uniteTab = [];
        for (let i = 0; i < tr.length; i++){
            let unite = [];
            let td = $(tr[i]).children();
            let input = td.find("input");
            for (let j = 0; j < input.length; j++) {
                unite.push(input[j].value)
            }
            uniteTab.push(unite);
        }
    })

});