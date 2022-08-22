$(function () {

    let namespace = "#menu-prix ";

    exportToExcel('.btn-export-to-excel','liste-prix-articles', '#table-historique-prix')

    const PRICES_RESOURCES = "http://localhost:8080/api/v1/prices";
    const $table_prix = $(namespace+"#table-prix tbody");
    /*
    EVENT MANAGER
     */
    const SUBSDIARIES_URL = "http://localhost:8080/api/v1/subsidiaries";

    function appendPriceToTable(data) {
        $(namespace+"#table-historique-prix tbody tr").empty();
        $.each(data, (key, value) => {
            let tr = [value.dateEnregistrement, value.prixVente, value.user.nom];
            push_to_table_list("#table-historique-prix", value.id, tr);
        })
    }

    const fecthPricesData = (uniteId,articleId,filialeId)=>{
        let url = SUBSDIARIES_URL+"/"+filialeId+"/"+uniteId+"/"+articleId;
        $.ajax({
            type : "GET",
            url : url,
            contentType: "application/json",
            success : (data) =>{
                appendPriceToTable(data);
            }
        })
    };
    // edition de prix, en click
    $(document).on('click', '.info-prix', function(){
        let id = $(this).closest('tr').attr("id");
        let split = id.split("-");
        if (split.length>2){
            $filiale_id = split[0];
            $article_id = split[1];
            $unite_id = split[2];
            fecthPricesData($unite_id,$article_id,$filiale_id);
        }
        $trArticle = $(this).closest('tr');
        $('#modal-info-prix').modal('show');
        $('#modal-info-prix').attr('data-id', $trArticle.attr('id'))
   //     affecter à mis a jour prix
        $('#modal-info-prix .label-designation-article').text('Designation : ' + $trArticle.children('.designation').text())
        $('#modal-info-prix .label-unite-article').text('(' + $trArticle.children('.unite').text() + ')')
        $('#modal-info-prix .input-prix-edit').val($trArticle.children('.prix').text())
        $('#modal-info-prix .label-date-prix').text('Date : ' + $trArticle.children('.date-maj').text())
    })

    /*

    mask et validation

     */

    $(function() {
        $(namespace + 'form').validate({
            rules : {
                inputPrix : {required : true, number : true}
            },
            messages : {
                inputPrix : {required : 'Prix d\' article requis', number : 'Veuillez entrée une nombre'}
            }
        })
    })

    function validation_input_prix() {
        $(namespace + 'form').validate();

        return $(namespace + 'form').valid();
    }

    // enregistrement d'un prix courant

    $('#modal-info-prix .btn-enregistrer-prix-editer').on('click', function(){
        if (validation_input_prix()) {
            let user_id = $('#user-id').attr("value-id");
            let user_name = $('#user-name').attr("value-id");
            let nouveauPrix = $('.input-prix-edit').val();
            let  price = {};
            if (nouveauPrix!==""){
                price.filiale = {
                    id : $filiale_id
                }
                price.user = {id:user_id}
                price.unite = {id:$unite_id}
                price.article = {id : $article_id}
                price.prixVente = nouveauPrix;
                price.dateEnregistrement = new Date();
                $.ajax({
                    type : "POST",
                    url : PRICES_RESOURCES,
                    contentType: "application/json",
                    data : JSON.stringify([price]),
                    success : (data) =>{
                        $.each(data,(key,value)=>{
                            let tr = [value.dateEnregistrement,value.prixVente,user_name];
                            push_to_table_list("#table-historique-prix",value.id,tr);
                            createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du prix effectu&eacute; avec succ&egrave;s!')
                        })
                    }
                })
            }
        }

    })

    // double click of tr, open facture info
    $('.table-article-prix tbody tr').dblclick(function () {
        // get code article when dblcliked article
        let code = $(this).children()[0].innerText;
    })
    // RECHERCHER PRIX
    $(document).on("keyup",namespace+"#prices-search",()=>{
        let text = $(namespace+"#prices-search").val();
        let filialeId = $(namespace+"#filiale-id").attr("value-id");
        if (text!==""){
            let url = "http://localhost:8080/api/v1/subsidiaries/"+filialeId+"/prices/"+text;
            $.ajax({
                type : "GET",
                url : url,
                contentType : "application/json",
                success : (data) => {
                    $table_prix.empty();
                    $.each(data,(key,value)=>{
                        let tr = `
                        <tr id=`+value.filiale.id+`-`+value.article.id+`-`+value.unite.id+`>
                        <td>`+value.article.designation+`</td>
                        <td>`+value.unite.designation+`</td>
                        <td>`+value.prixVente+`</td>
                        <td>`+value.dateEnregistrement+`</td>
                        <td class="d-flex justify-content-center"><a role="button" class="btn btn-sm btn-info info-prix"><i class="uil-pen"></i></a></td>
                         </tr>
                        `;
                        $table_prix.append(tr);
                    })
                }
            })
        }
    })
})