$(function () {
    let isCreateAction = true;
    // tout les champ non editable par defaut
    let categorieUrl = 'http://localhost:8080/api/v1/categories';
    function initTableUnite() {
        $('#table-unite input').attr('disabled', '')
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
    }
    function initAddAndSaveArticleBtn() {
        // chargement des categories lors de l'affichage du formulaire de categorie
        $("#newArticleBtn").click(() => {
            let tdElement = $("#categorieTabList tbody tr td:first-child");
            let select = $(".form-select");
            if (tdElement.length !== 0) {
                for (let i = 0; i < tdElement.length; i++) {
                    let text = tdElement[i].innerText;
                    let id = $(tdElement[i]).parent().attr("id");
                    if (text !== "Toutes") {
                        let option = `<option value="` + id + `">` + text + `</option>`
                        select.append(option);
                    }
                }
            } else {
                $.ajax({
                    type: 'GET',
                    url: categorieUrl,
                    success: function (categories) {
                        for (let i = 0; i < categories.length; i++) {
                            let option = `<option value="` + categories[i].id + `">` + categories[i].libelle + `</option>`
                            select.append(option);
                        }
                    }
                });
            }
        });
        // enregistrement de l'article
        $("#saveArticleBtn").click(() => {
            let designation = $("#designation").val();
            let categorieId = $("#categorie option:selected").val();
            let categorieLibelle = $("#categorie option:selected").text();
            let articleStatus = "USED";
            let tr = $('#table-unite tbody tr');
            let uniteTab = [];
            for (let i = 0; i < tr.length; i++) {
                let unite = [];
                let td = $(tr[i]).children();
                let input = td.find("input");
                for (let j = 0; j < input.length; j++) {
                    unite.push(input[j].value)
                }
                let uniteObject = {};
                uniteObject.code = unite[0];
                uniteObject.niveau = unite[1];
                uniteObject.designation = unite[2];
                uniteObject.quantite = unite[3];
                uniteObject.poids = unite[4];
                uniteTab.push(uniteObject);
            }
            let article = {
                designation: designation,
                categorie: {
                    id: categorieId,
                    libelle: categorieLibelle
                },
                unite: uniteTab,
                status: articleStatus
            }
            let url = "http://localhost:8080/api/v1/articles";
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(article),
                success: function (data) {
                    let table = $("#articleTable tbody");
                    let uniteTab = data.unite;
                    uniteTab.forEach(function (unite) {
                        let tableRow = `
                         <tr>
                            <td>` + unite.code + `</td>
                            <td>` + data.designation + `</td>
                            <td>` + unite.designation + `</td>
                            <td>` + unite.quantite + `</td>
                            <td>` + unite.poids + `</td>
                            <td>` + data.categorie.libelle + `</td>
                            <td>
                                        <div>   
                                            <a id="` + data.id + `" class="btn-sm btn-info editArticleBtn"><i class="uil-pen"></i></a>
                                            <a id="` + data.id + `"  class="btn-sm btn-danger deleteArticleBtn "><i class="uil-trash-alt"></i></a>
                                            <a id="` + data.id + `"  class="btn-sm btn-warning hideArticleBtn"><i class="uil-eye-slash"></i></a>
                                        </div>
                            </td>
                        </tr>`;
                        table.append(tableRow);
                    });
                }
            });
        });
    }
    function initAddArticleModal(){
        initTableUnite();
        initAddAndSaveArticleBtn();
    }
    function initTableRowEvent() {
        // Initialisation de l'evenement des tr
        let div = $("#articleTable tbody tr td div");
        let tr = $("#articleTable tbody tr");
        div.hide();
        tr.mouseenter(function () {
            $(this).children().last().children().first().show();
        });
        tr.mouseleave(function () {
            $(this).children().last().children().first().hide();
        });
    }
    function initTableAction() {

        $(".editArticleBtn").click(function () {

        });

        $(".deleteArticleBtn").click(function () {
            let btn = $(this);
            let id = btn.attr("id");
            let url = 'http://localhost:8080/api/v1/articles/' + id + "/DELETED";
            $.ajax({
                type: 'PUT',
                url: url,
                success: function (data) {
                    console.log(data)
                    btn.parent().parent().parent().remove();
                }
            });
        });

        $(".hideArticleBtn").click(function () {
            let btn = $(this);
            let id = btn.attr("id");
            console.log(id);
            let url = 'http://localhost:8080/api/v1/articles/' + id + '/HIDEN';
            $.ajax({
                type: 'PUT',
                url: url,
                success: function (data) {
                    console.log(data)
                    btn.parent().parent().parent().remove();
                }
            });
        });
    }
    function initArticleTable() {
        initTableAction();
        initTableRowEvent();
    }

    initArticleTable();
    initAddArticleModal();
});