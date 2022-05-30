console.log("js ici");
$(function () {
    // ajout du nouveau unite
    $("#btn-new-unite").click(
        function () {
            console.log("ici");
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
    )

    //

});