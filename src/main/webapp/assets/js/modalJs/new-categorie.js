$(function(){
    $("#saveCategorieBtn").click(function (){
         let url = "http://localhost:8080/ijeery-1.0-SNAPSHOT/api/v1/categories";
         let data = $("#nomCategorie").val();
         let jsonData = {'libelle':data};
        $.get(url,function (data,status) {
            console.log(data);
        });
        // $.ajax({
        //     url: url,
        //     type: "POST",
        //     data: JSON.stringify(jsonData),
        //     contentType: "app/json",
        //     success: function (data) {
        //         // let output = data.map(i => "<tr><td>" + i.bookId + "</td><td>" + i.BookName + "</td><td>" + i.BookPrice + "</td></tr>");
        //         // $("#output").html(output);
        //         // $("#tbstock").show();
        //     }
        // });
    });


});