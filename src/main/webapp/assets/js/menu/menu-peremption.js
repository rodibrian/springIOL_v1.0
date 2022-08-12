$(function () {
    /*-------------------------
            MENU PEREMPTION
     ---------------------------*/
    let namespace = "#menu-peremption ";

    exportToExcel(namespace +'.btn-export-to-excel','peremptions', namespace + '.table-peremption');
    $(document).on('dblclick',namespace + '.table-peremption tbody tr',function () {
        // get code of current article
        let tr = $(this);
        let tr_id = tr.attr("id");
        let split = tr_id.split("-");
        let magasin_id = split[0];
        let article_id = split[1];
        let unite_id = split[2];
        $(namespace + '#modal-date-peremption').modal('show')
        // enregistrement du date de peremption
        $(namespace + "#modal-date-peremption #btn-enregistrer-date-peremption").on('click', function(){
            let old_date = $(tr).children().eq(3).text();
            $datePeremption = $(namespace + '#modal-date-peremption #input-date-peremption').val();
            let date_wrapper = {};
            date_wrapper.newDate = new Date($datePeremption);
            date_wrapper.oldDate = new Date(old_date);
            let url = "http://localhost:8080/api/v1/expirations/"+magasin_id+"/"+article_id+"/"+unite_id;
            execute_ajax_request("PUT",url,date_wrapper,(data)=>{
                $(tr).children().eq(3).text(new Date($datePeremption).toLocaleDateString());

            })
        })
    })

    /*
    *
    *   RECHERCHER ARTICLE
    *
    * */

    function createBadgeClass(value){
        switch (value) {
            case "périmé" : return "badge badge-danger-lighten";
            case "fort" : return "badge badge-success-lighten";
            case "faible" : return "badge badge-warning-lighten";
            case 'moyenne': return "badge badge-primary-lighten";
        }
    }

    const appendExpirationData = (expiration_data) =>{
        $("#expiration-table tbody").empty();
        console.log(expiration_data);
        $.each(expiration_data,(key,value)=>{
            let row_id = value.magasinId +"-"+ value.articleId +"-"+ value.uniteId ;
            let tr= [
                value.nomArticle,
                value.nomUnite,
                value.quantitePeremetion,
                value.datePeremption,
                `<span class="badge `+createBadgeClass(value.expirationStatus)+`">`+value.expirationStatus+`</span>`
            ];
            push_to_table_list("#expiration-table",row_id,tr)
          })
    }

    $(document).on("click",namespace+"#search-btn",()=>{
        let product_name = $(namespace+"#top-search").val();
        if (product_name!==""){
            let filialeId = $(namespace + '#filiale-id').attr("value-id");
            let url = "http://localhost:8080/api/v1/expirations/"+filialeId+"/"+product_name;
            execute_ajax_request("get",url,null,(expiration_data)=> appendExpirationData(expiration_data));
        }
    })

    /*
    *
    * ARTICLE STATUS [ PERIME,FAIBLE,MOYENNE,FORTE]
    *
    * */
    $(namespace+".btn-status").click(function (){
        let expiration_status = $(this).text();
        let filialeId = $(namespace + '#filiale-id').attr("value-id");
        let url ="http://localhost:8080/api/v1/expirations/"+filialeId+"/status/"+expiration_status;
        execute_ajax_request("get",url,null,(expiration_data)=> appendExpirationData(expiration_data));
    })
    /*
     ajouter un article à peremption
     */

    $(document).on('dblclick', namespace + "#modal-liste-article tbody tr", function() {

        $article = $(this);

        push_to_table_list(namespace + ".table-peremption", $article.children().eq(0).text(),
            [$article.children().eq(0).text(), $article.children().eq(1).text(), $article.children().eq(2).text(), $article.children().eq(3).text(), new Date().toLocaleDateString(), setLabelPeremption( new Date()) ])

        $(namespace + "#modal-liste-article").modal('hide')
    })
    /*
     ajouter bouton date de peremption
     */
    function setLabelPeremption($datePeremption) {

        if ($datePeremption > new Date())
            return $('<span class="badge badge-primary-lighten">Forte</span>').html()
        return $('<span class="badge badge-danger-lighten">p&eacute;rim&eacute;</span>').html()

    }

    /*
    *  FILTRER EN FONCTION MAGASIN
    * */

    // Magasin filter
    $(document).on('change',namespace+"#magasin-select-item",function(){
        let magasinId = $(this).val();
        if (magasinId!=="toutes"){
            let url = "http://localhost:8080/api/v1/expirations/"+magasinId;
            execute_ajax_request('get',url,null,(data)=>appendExpirationData(data));
        }
    })

})