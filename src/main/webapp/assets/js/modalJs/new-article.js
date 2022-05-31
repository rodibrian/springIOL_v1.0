$(function () {
    let categorieUrl = 'http://localhost:8080/api/v1/categories';
    // ajout du nouveau unite
    $("#btn-new-unite").click(
        function () {
            let table = $("#table-unite tbody");
            let length = $("#table-unite tbody tr").length;
            length++;

            // cacher le enregistrement
            $("#table-unite tbody tr th a.btn-success").hide();

            // cacher edition et suppression du dernier
            $("#table-unite tbody tr th #edit_"+length).hide();
            $("#table-unite tbody tr th #del_"+length).hide();

            let tr = `<tr>
                            <th><input type="text" id="code_`+length+`" class="form-control input-sm" value="000"></th>
                            <th><input type="text" id="niveau_`+length+`" class="form-control input-sm" value="0"></th>
                            <th><input type="text" id="designation_`+length+`" class="form-control input-sm" value="designation"></th>
                            <th><input type="text" id="quantite_`+length+`" class="form-control input-sm" value="0"></th>
                            <th><input type="text" id="poids_`+length+`" class="form-control input-sm" value="0Kg"></th>
                            <th class="d-inline-flex">
                                <a class="btn btn-primary btn-sm" id="edit_`+length+`"><i class="uil-pen"></i></a>&nbsp;
                                <a class="btn btn-danger btn-sm" id="del_`+length+`"><i class="uil-trash-alt"></i></a>&nbsp;
                                <a class="btn btn-success btn-sm" id=add_`+length+`"><i class="uil-check-square"></i></a>
                            </th>
                        </tr>`;
            table.append(tr);
        }
    );
    $("#newArticleBtn").click(()=>{
        let children = $("#categorieTabList tbody tr")
        let select = $(".form-select");
        if (children.length!==0){
            for (let i = 0 ; i < children.length; i++){
                console.log(children[i]);
                // let id = children[i].attr("id");
                // let libelle = children[i].html();
                // let option = `<option value="`+id+`">`+libelle+`</option>`
                // select.append(option);
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