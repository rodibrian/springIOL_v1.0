$(function(){

    let namespace = "#menu-detail-vente ";
    exportToExcel(namespace + '.btn-export-to-excel','detail-ventes-' , namespace + '.table-detail-vente')
    let appendDataToTable = (data) =>{
        $.each(data,(key,salesValue) =>{
            let info = salesValue.infoArticleMagasin;
            $.each(info,(key,infoValue)=>{
                let tr =[
                    infoValue.reference,
                    salesValue.client.nom,
                    infoValue.article.designation,
                    infoValue.unite.designation,
                    infoValue.quantiteAjout,
                    (salesValue.montantVente/infoValue.quantiteAjout),
                    salesValue.montantVente,
                    infoValue.date
                ]
                push_to_table_list(namespace+"#details-vente-table",salesValue.id,tr);
            })
        });
    }

    let getAllSales = (url) =>{
        execute_ajax_request("get",url,null,(data)=>{
            $(namespace+"#details-vente-table tbody tr").empty();
            appendDataToTable(data);
        })
    };

    let url = "http://localhost:8080/api/v1/magasins/";
    // Magasin filter
    $(document).on('change',namespace+"#magasin-select-operation",function(){
        let magasinId = $(this).val();
        let ressource_url = url+magasinId+"/sales";
        getAllSales(ressource_url);
    })
    // NAME FILTER
    $(document).on("keyup",namespace+"#nom-input",()=>{
          let text = $(namespace+"#nom-input").val();
          let magasinId = $(namespace+"#magasin-select-operation option:selected").val();
          let typeFilter = $(namespace+"#type-filter option:selected").val();
          if (text!==undefined && text!==""){
              let ressource_url = url+magasinId+"/sales/"+typeFilter+"/"+text;
              getAllSales(ressource_url);
          }
    });
    // SEARCH BUTTON
    $(namespace+"#search-button").click(()=>{
        let beginDate = $(namespace+"#begin-date-input").val();
        let endDate = $(namespace+"#end-date-input").val();
        let magasinId = $(namespace+"#magasin-select-operation option:selected").val();
        let typeFilter = $(namespace+"#type-filter option:selected").val();
        if (typeFilter==='DATE'){
            let ressource_url = url+magasinId+"/sales/"+typeFilter+"/"+beginDate+"/"+endDate;
            getAllSales(ressource_url);
        }
    })
})
