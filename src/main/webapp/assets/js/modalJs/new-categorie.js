$(function(){
    let isUpdateOperation = false;
    let editBtnId = 1;
    let selectedVal = "";
    let siblings;
    let div = $("#categorieTabList tbody tr td div");
    let tr =  $("#categorieTabList tbody tr");
    div.hide();
    tr.mouseenter(function (){
        $(this).children().last().children().first().show();
    });
    tr.mouseleave(function (){
        $(this).children().last().children().first().hide();
    });

    $("#saveCategorieBtn").click(function (){
        let newVal = $("#nomCategorie").val();
        if (!isUpdateOperation){
            let categoriesUrl = 'http://localhost:8080/api/v1/categories';
            let jsonData = {
                libelle : newVal
            };
            $.ajax({
                type: 'POST',
                url: categoriesUrl,
                contentType: 'application/json',
                data: JSON.stringify(jsonData) ,
                success: function (data){
                    //reset the input
                    $("#nomCategorie").val("");
                    let categorie = `
                            <tr class="categorieRow" id="`+data.id+`">
                                     <td> `+data.libelle+`</td>
                                     <td>
                                            <div style="display: flex;align-content: center;">
                                                <a id="`+data.id+`"  href="#" class="editCategorie"><i class="uil-pen"></i></a>
                                                <a id="`+data.id+`"  href="#" class="deleteCategorie"><i class="uil-trash-alt"></i></a>
                                            </div>
                                     </td>
                            </tr>
                `;
                    $("#categorieTabList tbody").append(categorie);
                },
                error: function () {
                    console.log(' ERROR ')
                }
            });
        }else{
            if (selectedVal!==newVal){
                let url = "http://localhost:8080/api/v1/categories/"+editBtnId;
                let jsonData = {
                    libelle : newVal
                };
                $.ajax({
                    type: 'PUT',
                    url: url,
                    contentType: 'application/json',
                    data: JSON.stringify(jsonData) ,
                    success: function (data){
                        //reset the input
                        $("#nomCategorie").val("");
                        siblings.html( newVal)
                    }
                });
            }
            isUpdateOperation = false;
        }
    });
    $(".editCategorie").click(function (){
        isUpdateOperation = true;
        editBtnId = $(this).attr("id");
        siblings = $(this).parent().parent().siblings();
        let text = siblings.html();
        selectedVal = $("#nomCategorie").val(text);
    })
    $(".deleteCategorie").click(function (){
        let btn = $(this);
        let deleteBtnId = btn.attr("id");
        let url = "http://localhost:8080/api/v1/categories/"+deleteBtnId;
        $.ajax({
            type: 'DELETE',
            url: url,
            complete: function (){
                // Supprimer l'element
                btn.parent().parent().parent().detach();
            }
        });
    })
});