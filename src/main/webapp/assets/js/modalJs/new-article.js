$(function () {

    let namespace = "#new-article ";

    let isCreateAction = true;
    let isCreateArticle = true;
    let editedArticleId = 1;
    // tout les champ non editable par defaut
    let categorieUrl = 'http://localhost:8080/api/v1/categories';

    function initTableUnite() {
        $(namespace + '#table-unite input').attr('disabled', '')
        // ajout du nouveau unite
        $(namespace + "#btn-new-unite").click(
            function () {
                let table = $(namespace + "#table-unite tbody");
                let length = $(namespace + "#table-unite tbody tr").length;
                // cacher le enregistrement
                $(namespace + "#table-unite tbody tr th a.btn-success").hide();
                $(namespace + '#table-unite input').attr('disabled', '')

                // cacher edition et suppression du dernier
                $(namespace + "#table-unite tbody tr th #edit_" + length).hide();
                $(namespace + "#table-unite tbody tr th #del_" + length).hide();
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
        $(namespace + '#table-unite').on('click', '.btn-add-unite', (function () {
            $(this).closest('tr').find('input').attr('disabled', '');
            $(this).hide();
        }))
        //suppression unite
        $(namespace + '#table-unite').on('click', '.btn-del-unite', (function () {
            $(this).closest('tr').remove();
        }))
        // edition d'une unite
        $(namespace + '#table-unite').on('click', '.btn-edit-unite', (function () {
            $(this).closest('tr').find('input').removeAttr('disabled')
            $(this).closest('tr').find('.btn-add-unite').show()
        }));
    }

    function initAddAndSaveArticleBtn() {
        // chargement des categories lors de l'affichage du formulaire de categorie
        $(namespace + "#newArticleBtn").click(() => {

            let tdElement = $(namespace + "#categorieTabList tbody tr td:first-child");
            let select = $(namespace + ".form-select");
            select.empty();
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

        function createArticleAndUnite() {

            let designation = $(namespace + "#designation").val();
            let categorieId = $(namespace + "#categorie option:selected").val();
            let categorieLibelle = $(namespace + "#categorie option:selected").text();
            let articleStatus = "USED";
            let tr = $(namespace + '#table-unite tbody tr');
            let uniteTab = [];

            for (let i = 0; i < tr.length; i++) {
                let unite = [];
                let td = $(tr[i]).children();
                let trId = $(tr[i]).attr("id");
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

                if (!isCreateArticle)
                    uniteObject.id = trId;

                uniteTab.push(uniteObject);
            }
            let article = {}
            article.designation = designation;
            article.categorie = {id: categorieId, libelle: categorieLibelle};
            article.unite = uniteTab;
            article.status = articleStatus;
            if (!isCreateArticle) {
                article.id = editedArticleId;
            }
            let url = "http://localhost:8080/api/v1/articles";
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(article),
                success: function (data) {
                    let table = $(namespace + "#articleTable tbody");
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
        }

        function updateArticle() {
            let designation = $(namespace + "#designation").val();
            let categorieLibelle = $(namespace + "#categorie option:selected").text();

        }

        // enregistrement de l'article
        $(namespace + "#saveArticleBtn").click(() => {
            if (isCreateArticle) {
                createArticleAndUnite();
                createToast('bg-success', 'uil-file-check', 'Creation Fait', 'Creation d\'un nouveau article effectu&eacute; avec succ&egrave;s!')
            } else {
                updateArticle();
                isCreateArticle = true;
                createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification de l\'article effectu&eacute; avec succ&egrave;s!')
            }
        });
    }

    function initAddArticleModal() {
        initTableUnite();
        initAddAndSaveArticleBtn();
    }

    function initTableRowEvent() {
        // Initialisation de l'evenement des tr
        let div = $(namespace + "#articleTable tbody tr td div");
        let tr = $(namespace + "#articleTable tbody tr");
        div.hide();
        tr.mouseenter(function () {
            $(this).children().last().children().first().show();
        });
        tr.mouseleave(function () {
            $(this).children().last().children().first().hide();
        });
    }

    function initTableAction() {
        function initCategorieSelect() {
            let tdElement = $(namespace + "#categorieTabList tbody tr td:first-child");
            let select = $(namespace + ".form-select");
            // Supprimer toutes les elements dans la select
            $(namespace + "select#categorie").empty();
            if (tdElement.length !== 0) {
                for (let i = 0; i < tdElement.length; i++) {
                    let text = tdElement[i].innerText;
                    let id = $(tdElement[i]).parent().attr("id");
                    if (text !== "Toutes") {
                        let option = `<option value="` + id + `">` + text + `</option>`
                        select.append(option);
                    }
                }
            }
        }

        $(namespace + ".editArticleBtn").click(function () {
            isCreateArticle = false;
            editedArticleId = $(this).attr("id");
            console.log(" Edited article = " + editedArticleId);
            initCategorieSelect();
            $tr = $(this).closest('tr');
            designation = $tr.children()[1].innerText;
            categorie = $tr.children()[5].innerText;
            // affectation dans la formulaire
            $('input#designation').val(designation)
            $('select#categorie option:contains("' + categorie + '")').attr('selected', 'true')
            let url = 'http://localhost:8080/api/v1/articles/' + editedArticleId + "/unites";
            $.ajax({
                type: 'GET',
                url: url,
                success: function (data) {
                    let table = $(namespace + "#table-unite tbody");
                    // SUPRIMER TOUTES LES DONNE
                    table.empty();
                    for (let i = 0; i < data.length; i++) {
                        let tr = `<tr id="` + data[i].id + `">
                                    <td><input type="text"  class="form-control input-sm" value="` + data[i].code + `"></td>
                                    <td><input type="text"  class="form-control input-sm" value="` + data[i].niveau + `"></td>
                                    <td><input type="text"  class="form-control input-sm" value="` + data[i].designation + `"></td>
                                    <td><input type="text"  class="form-control input-sm" value="` + data[i].quantite + `"></td>
                                    <td><input type="text"  class="form-control input-sm" value="` + data[i].poids + `"></td>
                                    <td class="d-inline-flex">
                                        <a class="btn btn-primary btn-sm btn-edit-unite"><i class="uil-pen"></i></a>&nbsp;
                                        <a class="btn btn-danger btn-sm btn-del-unite"><i class="uil-trash-alt"></i></a>&nbsp;
                                        <a class="btn btn-success btn-sm btn-add-unite"><i class="uil-check-square"></i></a>
                                    </td>
                                </tr>`;
                        table.append(tr);
                    }
                }
            });
        });
        $(namespace + ".deleteArticleBtn").click(function () {
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
            createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait', 'Suppression de l\' article effectu&eacute; avec succ&egrave;s!')
        });
        $(namespace + ".hideArticleBtn").click(function () {
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
            createToast('bg-warning', 'uil-eye-slash', 'Article Masqu&eacute;', 'Masquage de l\'article effectu&eacute; avec succ&egrave;s!')
        });
    }

    function initArticleTable() {
        initTableAction();
        initTableRowEvent();
    }

    initArticleTable();
    initAddArticleModal();
});