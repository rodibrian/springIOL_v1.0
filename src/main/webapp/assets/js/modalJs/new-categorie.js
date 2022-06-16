$(function () {

    let namespace = "#standard-modal2 ";

    let isUpdateOperation = false;
    let editBtnId = 1;
    let selectedVal = "";
    let siblings;
    let div = $(namespace + "#categorieTabList tbody tr td div");
    let tr = $(namespace + "#categorieTabList tbody tr");
    div.hide();
    tr.mouseenter(function () {
        $(this).children().last().children().first().show();
    });
    tr.mouseleave(function () {
        $(this).children().last().children().first().hide();
    });

    $(namespace + "#saveCategorieBtn").click(function () {
        let newVal = $(namespace + "#nomCategorie").val();
        if (!isUpdateOperation) {
            let categoriesUrl = 'http://localhost:8080/api/v1/categories';
            let jsonData = {
                libelle: newVal
            };
            $.ajax({
                type: 'POST',
                url: categoriesUrl,
                contentType: 'application/json',
                data: JSON.stringify(jsonData),
                success: function (data) {
                    //reset the input
                    $(namespace + "#nomCategorie").val("");
                    let categorie = `
                            <tr class="categorieRow" id="` + data.id + `">
                                     <td> ` + data.libelle + `</td>
                                     <td>
                                            <div style="display: flex;align-content: center;">
                                                <a id="` + data.id + `"  href="#" class="editCategorie"><i class="uil-pen"></i></a>
                                                <a id="` + data.id + `"  href="#" class="deleteCategorie"><i class="uil-trash-alt"></i></a>
                                            </div>
                                     </td>
                            </tr>
                `;
                    $(namespace + "#categorieTabList tbody").append(categorie);
                }
            });
            createToast('bg-success', 'uil-file-check', 'Creation Fait', 'Creation du nouveau cat&eacute;gorie effectu&eacute; avec succ&egrave;s!')
        } else {
            if (selectedVal !== newVal) {
                let url = "http://localhost:8080/api/v1/categories/" + editBtnId;
                let jsonData = {
                    libelle: newVal
                };
                $.ajax({
                    type: 'PUT',
                    url: url,
                    contentType: 'application/json',
                    data: JSON.stringify(jsonData),
                    success: function (data) {
                        //reset the input
                        $(namespace + "#nomCategorie").val("");
                        siblings.html(newVal)
                    }
                });
                createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du cat&eacute;gorie effectu&eacute; avec succ&egrave;s!')
            }
            isUpdateOperation = false;
        }
    });
    $(".editCategorie").click(function () {
        isUpdateOperation = true;
        editBtnId = $(this).attr("id");
        siblings = $(this).parent().parent().siblings();
        let text = siblings.html();
        selectedVal = $(namespace + "#nomCategorie").val(text);
    })
    $('.deleteCategorie').on('click', '')

    $(".deleteCategorie").click(function () {
        let btn = $(this);
        let deleteBtnId = btn.attr("id");
        let url = "http://localhost:8080/api/v1/categories/" + deleteBtnId;
        $.ajax({
            type: 'DELETE',
            url: url,
            complete: function () {
                // Supprimer l'element
                btn.parent().parent().parent().detach();
            }
        });
        createToast('bg-danger', 'uil-trash-alt', 'Suppression Fait', 'Suppression du cat&eacute;gorie effectu&eacute; avec succ&egrave;s!')
    })
});