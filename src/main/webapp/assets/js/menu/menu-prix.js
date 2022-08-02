$(function () {

    let namespace = "#menu-prix ";
    /*

    MENU PRIX

     */

    // // Chargement des données de la table
    //
    // $lesArticles = [
    //     {
    //         codeArticle: '123',
    //         nomArticle: 'Biscuit',
    //         uniteArticle: ['piece', 'carton', 'sac'],
    //         prix: ['0', '0', '0'] // prix par unité
    //     },
    //     {
    //         codeArticle: '456',
    //         nomArticle: 'Bonbon',
    //         uniteArticle: ['piece', 'carton', 'sac', 'sac10'],
    //         prix: ['0', '0', '0', '0'] // prix par unité
    //     },
    //     {
    //         codeArticle: '789',
    //         nomArticle: 'Jus',
    //         uniteArticle: ['Litre', 'Bouteille de 5L', 'Bidon de 20L'],
    //         prix: ['0', '0', '0'] // prix par unité
    //     }
    // ]
    //
    // $.each($lesArticles, function(keyArticle, valueArticle) {
    //     $.each(valueArticle.uniteArticle, function(keyUnite, valueUnite) {
    //         $trArticle = $('<tr></tr>').attr('id', valueArticle.codeArticle + '-' + keyUnite);
    //         $trArticle.append('\n' +
    //             '            <td>' + $trArticle.attr("id") + '</td>\n' +
    //             '            <td class="designation">' + valueArticle.nomArticle + '</td>\n' +
    //             '            <td class="unite">' + valueArticle.uniteArticle[keyUnite] + '</td>\n' +
    //             '            <td class="prix">' + valueArticle.prix[keyUnite] + '</td>\n' +
    //             '            <td class="date-maj">' + new Date().toLocaleString() + '</td>\n' +
    //             '            <td class="d-flex justify-content-center">\n' +
    //             '              <a role="button" class="btn btn-sm btn-info info-prix">\n' +
    //             '                <i class="uil-pen"></i>\n' +
    //             '              </a>\n' +
    //             '            </td>\n' +
    //             '          ');
    //         $(namespace + '.table-article-prix tbody').append($trArticle);
    //     })
    // })

    /*

    EVENT MANAGER

     */
    const SUBSDIARIES_URL = "http://localhost:8080/api/v1/subsidiaries";

    const fecthPricesData = (uniteId,articleId,filialeId)=>{
        let url = SUBSDIARIES_URL+"/"+filialeId+"/"+uniteId+"/"+articleId;
        $.ajax({
            type : "GET",
            url : url,
            contentType: "application/json",
            success : (data) =>{
                $("#table-historique-prix tbody tr").empty();
                $.each(data,(key,value)=>{
                    let tr = [value.dateEnregistrement,value.prixVente,value.user.nom];
                    push_to_table_list("#table-historique-prix",value.id,tr);
                })
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

    // enregistrement d'un prix courant
    $('#modal-info-prix .btn-enregistrer-prix-editer').on('click', function(){
        let user_id = $('#user-id').attr("value-id");
        let user_name = $('#user-name').attr("value-id");
        let nouveauPrix = $('.input-prix-edit').val();
        let  price = {};
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
            url : "http://localhost:8080/api/v1/prices",
            contentType: "application/json",
            data : JSON.stringify(price),
            success : (data) =>{
                let tr = [data.dateEnregistrement,data.prixVente,user_name];
                push_to_table_list("#table-historique-prix",data.id,tr);
                createToast('bg-success', 'uil-pen', 'Modification Fait', 'Modification du prix effectu&eacute; avec succ&egrave;s!')
            }
        })
    })

    // double click of tr, open facture info
    $('.table-article-prix tbody tr').dblclick(function () {

        // get code article when dblcliked article

        let code = $(this).children()[0].innerText;
        console.log(code)
    })


})