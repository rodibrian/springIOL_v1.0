$(function(){
    let namespace = "#liste-operation ";
    let url = "http://localhost:8080/api/v1/magasins/";

    function appendDataToTable(data) {
        $(namespace + ".table-liste-operation tbody tr").empty();
        $.each(data, function (key, value) {
            let data = [value.reference,
                value.article.designation,
                value.unite.designation,
                value.typeOperation,
                value.quantiteAjout +" "+value.unite.designation,
                value.quantiteStockApresOperation +" "+value.unite.designation,
                value.date,
                value.description,
                value.user.nom]
            push_to_table_list(namespace + ".table-liste-operation",data.id, data)
        })
    }
    function getAllActivities(url){
        $.ajax({
            type : "GET",
            url : url,
            contentType: "application/json",
            success : function (data){
                appendDataToTable(data);
            }
        });
    }
    // Magasin filter
    $(document).on('change',namespace+"#magasin-select-operation",function(){
        let magasinId = $(this).val();
        let ressource_url = url+magasinId+"/activities";
        getAllActivities(ressource_url);
    })
    // BUTTON RECHERCHER
    $(namespace +"#search-button").click(()=>{
        let magasinId = $(namespace+"#magasin-select-operation option:selected").val();
        if (magasinId!=="" || magasinId === undefined){
            let beginDate = $(namespace+"#begin-date-input").val();
            let endDate = $(namespace+"#end-date-input").val();
            let ressource_url = "";
            if (beginDate!==undefined && beginDate!==null
                && endDate!==undefined && endDate!==null
                && beginDate!=="" && endDate!==""){
                ressource_url = url+magasinId+"/activities/"+beginDate+"/"+endDate;
            }else if ( (endDate===undefined || endDate==null) && beginDate!==undefined && beginDate!==null && beginDate!==""){
                ressource_url = url+magasinId+"/activities/"+beginDate;
            }
            getAllActivities(ressource_url);
        }
    })
})