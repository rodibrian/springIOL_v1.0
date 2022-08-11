$(function () {
    /*--------------------------
        JS NOUVEAU ARTICLE
     ---------------------------*/
    let namespace = "#new-article ";
    let isCreateArticle = true;
    let editedArticleId = 1;
    // Tout les champ non editable par default
    let categorieUrl = 'http://localhost:8080/api/v1/categories';
    $articleUrl = 'http://localhost:8080/api/v1/articles';
    $deleted = true;
    $articleTable = $("#articleTable tbody");
    function initTableUnite() {
        $('#table-unite input').attr('disabled', '')
        // ajout du nouveau unite
        $("#btn-new-unite").click(
            function () {
                let table = $("#table-unite tbody");
                let length = $("#table-unite tbody tr").length;
                // cacher le enregistrement
                $("#table-unite tbody tr th a.btn-success").hide();
                $('#table-unite input').attr('disabled', '');
                // cacher edition et suppression du dernier
                $("#table-unite tbody tr th #edit_" + length).hide();
                $("#table-unite tbody tr th #del_" + length).hide();
                let tr = `<tr>
                            <td class="d-none"><input type="text" required  class="form-control input-sm" value="000"></td>
                            <td><input type="text" required  class="form-control input-sm not-editable" value="0"></td>
                            <td><input type="text" required  class="form-control input-sm" value="designation"></td>
                            <td><input type="text" required  class="form-control input-sm" value="1"></td>
                            <td><input type="text" required  class="form-control input-sm" value="1"></td>
                            <td class="d-inline-flex">
                                <a class="btn btn-primary btn-sm btn-edit-unite"><i class="uil-pen"></i></a>&nbsp;
                                <a class="btn btn-danger btn-sm btn-del-unite"><i class="uil-trash-alt"></i></a>&nbsp;
                                <a class="btn btn-success btn-sm btn-add-unite"><i class="uil-check-square"></i></a>
                            </td>
                        </tr>`;
                table.append(tr);
                updateNiveauUnite();
            }
        )
        /*
         edition ou enregistrement enregistrement
         */
        $('#table-unite').on('click', '.btn-add-unite', (function () {
            $(this).closest('tr').find('input').attr('disabled', '');
            $(this).hide();
        }))
        /*
        suppression unite
         */
        $('#table-unite').on('click', '.btn-del-unite', (function () {
            $(this).closest('tr').remove();
            updateNiveauUnite()
        }))
        /*
         edition d'une unite
         */
        $('#table-unite').on('click', '.btn-edit-unite', (function () {
            $(this).closest('tr').find('input').removeAttr('disabled')
            $(this).closest('tr').find('.btn-add-unite').show()
            $('.not-editable').attr('disabled','');
        }));
    }
    function fetchCategorie(select) {
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

    function initAddAndSaveArticleBtn() {
        // chargement des categories lors de l'affichage du formulaire de categorie
        $("#newArticleBtn").click(() => {
            let tdElement = $("#categorieTabList tbody tr td:first-child");
            let select = $(".form-select");
            select.empty();
            if (tdElement.length !== 0){
                for (let i = 0; i < tdElement.length; i++) {
                    let text = tdElement[i].innerText;
                    let id = $(tdElement[i]).parent().attr("id");
                    if (text !== "Toutes") {
                        let option = `<option value="` + id + `">` + text + `</option>`
                        select.append(option);
                    }
                }
            }else fetchCategorie(select);
        });

        function getAllUniteOnTable(data){
            let tr = $('#table-unite tbody tr');
            let articleId = data.id;
            let articleUniteTab = [];
            for (let i = 0; i < tr.length; i++) {
                let uniteRow = [];
                let td = $(tr[i]).children();
                let trId = $(tr[i]).attr("id");
                let input = td.find("input");
                for (let j = 0; j < input.length; j++) {
                    uniteRow.push(input[j].value)
                }
                // UNITE
                let unite = {};
                unite.code = uniteRow[0];
                unite.designation = uniteRow[2];
                // ARTICLE UNITE

                let articleUnite = {};
                articleUnite.article = {
                    id: articleId
                };
                articleUnite.unite = unite;
                articleUnite.niveau = uniteRow[1];
                articleUnite.quantiteNiveau = uniteRow[3];
                articleUnite.poids = uniteRow[4];
                articleUnite.filiale = {id: $filialeId};
                articleUniteTab.push(articleUnite);
            }
            return articleUniteTab;
        }

        function persitDefaultPrice(data) {
            let pvuafTab = [];
            $.each(data,(key,value)=>{
                let fuap = {};
                fuap.user = {
                    id: $userId
                }
                fuap.filiale = {id : value.filiale.id }
                fuap.unite = { id : value.unite.id }
                fuap.article = {id: value.article.id}
                fuap.dateEnregistrement = new Date();
                fuap.prixVente = "0";
                pvuafTab.push(fuap);
            })
            let url = "http://localhost:8080/api/v1/prices";
            execute_ajax_request("POST",url,pvuafTab,null);
            // $.ajax({
            //     type: "POST",
            //     url: "http://localhost:8080/api/v1/prices",
            //     contentType: 'application/json',
            //     data: JSON.stringify(pvuafTab),
            //     success: function (data){
            //     }
            // })
        }
        function persistArticleAndUnite(){
            let designation = $("#designation").val();
            let categorieId = $("#categorie option:selected").val();
            let categorieLibelle = $("#categorie option:selected").text();
            $filialeId = $(namespace + '#filiale-id').attr("value-id");
            $userId = $(namespace + '#user-id').attr("value-id");
            let articleStatus = "USED";
            let article = {}
            article.designation = designation;
            article.categorie = {id: categorieId, libelle: categorieLibelle};
            article.status = articleStatus;
            article.isPerishable = true;
            if (!isCreateArticle) article.id = editedArticleId;
            function saveAllUnite(data) {
                let articleUniteTab = getAllUniteOnTable(data);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/v1/unites",
                    contentType: 'application/json',
                    data: JSON.stringify(articleUniteTab),
                    success: function (data){
                        articleUniteTab.forEach(function (au) {
                            let tableRow = `
                             <tr id=` + au.article.id + `>
                                <td>` + article.designation + `</td>
                                <td>` + article.categorie.libelle + `</td>
                                <td>` + au.poids + `</td>
                                <td>` + au.unite.designation + `</td>
                                <td>` + au.quantiteNiveau + `</td>
                                <td>
                                            <div>
                                                <a id="` + au.article.id + `" class="btn-sm btn-info editArticleBtn"><i class="uil-pen"></i></a>
                                                <a id="` + au.article.id + `"  class="btn-sm btn-danger deleteArticleBtn "><i class="uil-trash-alt"></i></a>
                                                <a id="` + au.article.id + `"  class="btn-sm btn-warning hideArticleBtn"><i class="uil-eye-slash"></i></a>
                                            </div>
                                </td>
                            </tr>`;
                            $articleTable.append(tableRow);
                        });
                        // INSERTION DES PRIX
                        persitDefaultPrice(data);
                        // Clear the form
                        $("#designation").text("");
                    }
                })
            }
            execute_ajax_request('POST',$articleUrl,article,(data)=>saveAllUnite(data))
        }
        function updateArticle() {
            let designation = $("#designation").val();
            let categorieLibelle = $("#categorie option:selected").text();
        }

        /*

        mask et validation

         */

        $(function() {
            $(namespace + 'form').validate({
                rules : {
                    designation : {required: true},
                    categorie : {required: true}
                },
                messages : {
                    designation : {required : 'designation requis pour une article'},
                    categorie : {required : 'categorire requis pour une article'}
                }
            })
        })

        function validation_nouveau_article() {
            $(namespace + 'form').validate();

            return $(namespace + 'form').valid();
        }

        // enregistrement de l'article
        $("#saveArticleBtn").click(() => {
            if (validation_nouveau_article()) {
                if (isCreateArticle) {
                    persistArticleAndUnite();
                    createToast('bg-success', 'uil-file-check', 'Creation Fait', 'Creation d\'un nouveau article effectu&eacute; avec succ&egrave;s!')
                } else {
                    updateArticle();
                    isCreateArticle = true;
                    createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification de l\'article effectu&eacute; avec succ&egrave;s!')
                }
                $(namespace).modal('hide');
            }

        });
    }

    function initAddArticleModal() {
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
    /*
     niveau article dynamique
     */
    function updateNiveauUnite() {
        $('#table-unite tbody tr').each(function (key, value) {
            $(value).children().eq(1).children().val(++key);
            $('.not-editable').attr('disabled','');
        })
    }

    function initTableAction() {
        function initCategorieSelect() {
            let tdElement = $("#categorieTabList tbody tr td:first-child");
            let select = $(".form-select");
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

        $(".editArticleBtn").click(function () {
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
            execute_ajax_request('get',url,null,(data)=>{
                let table = $("#table-unite tbody");
                // SUPRIMER TOUTES LES DONNE
                table.empty();
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr id="` + data[i].id + `">
                                    <td class="d-none"><input type="text" required  class="form-control input-sm" value="` + data[i].code + `"></td>
                                    <td><input type="text" required  class="form-control input-sm not-editable" value="` + data[i].niveau + `"></td>
                                    <td><input type="text" required  class="form-control input-sm" value="` + data[i].designation + `"></td>
                                    <td><input type="text" required  class="form-control input-sm" value="` + data[i].quantite + `"></td>
                                    <td><input type="text" required  class="form-control input-sm" value="` + data[i].poids + `"></td>
                                    <td class="d-inline-flex">
                                        <a class="btn btn-primary btn-sm btn-edit-unite"><i class="uil-pen"></i></a>&nbsp;
                                        <a class="btn btn-danger btn-sm btn-del-unite"><i class="uil-trash-alt"></i></a>&nbsp;
                                        <a class="btn btn-success btn-sm btn-add-unite"><i class="uil-check-square"></i></a>
                                    </td>
                                </tr>`;
                    table.append(tr);
                }
            });
        });
        function updateItem($deleted, $trCurrent) {
            $status = $deleted ? "DELETED" : "HIDDEN";
            $url = $articleUrl + "/" + $id + "/" + $status;
            execute_ajax_request('PUT',$url,null,(data)=>{
                $trCurrent.remove();
                hideAndRemove('#' + $modalId + '');
                createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait', 'Suppression de l\' article effectu&eacute; avec succ&egrave;s!')
            })
        }
        function updateArticle($trCurrent, $deleted, $codeArticle) {
            $id = $($trCurrent).attr("id");
            $modalId = $deleted ? "suppression-article" : "masquer-article";
            $modalText = $deleted ? 'Suppression Article' : 'Masquer Article';
            $modalTitle = $deleted ? 'Voulez vraiment supprimer cet article (id:' + $codeArticle + ') ?'
                : 'Voulez vraiment masquer cet article (id:' + $codeArticle + ') ?';
            $labelButton = $deleted ? "supprimer" : "masquer";
            $classButton = $deleted ? "btn-danger" : "bg-warning";
            create_confirm_dialog($modalText, $modalTitle, $modalId, "Oui ,"+$labelButton, $classButton)
                .on('click', function (){
                    updateItem($deleted, $trCurrent);
                })
        }
        $(document).on('click', '#articleTable .deleteArticleBtn', function () {
            $codeArticle = $(this).closest('tr').children().eq(0).text();
            $trCurrent = $(this).closest('tr');
            updateArticle($trCurrent, $deleted, $codeArticle);
        })
        $(".hideArticleBtn").click(function () {
            $codeArticle = $(this).closest('tr').children().eq(0).text();
            $trCurrent = $(this).closest('tr');
            updateArticle($trCurrent, !$deleted, $codeArticle);

        });
    }
    function initArticleTable() {
        initTableAction();
        initTableRowEvent();
    }
    initArticleTable();
    initAddArticleModal();
});