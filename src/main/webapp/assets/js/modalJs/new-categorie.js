$(function(){
    $("#saveCategorieBtn").click(function (){
        event.preventDefault();
         let url = "http://localhost:8080/api/v1/categories";
         let jsonData = {
             libelle : $("#nomCategorie").val()
         };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/v1/categories',
            contentType: 'application/json',
            data: JSON.stringify(jsonData) ,
            succes: function (data){
               console.log(" SUCCES ")
            },
            error: function () {
                console.log(' ERROR ')
            },complete : function (data) {

                let categorie = `
                            <tr id="`+data.id+`">
                             <td> `+data.libelle+`</td>
                            </tr>
                `;
             $("#categorieTabList").append(categorie);

            }
        });
    });
});