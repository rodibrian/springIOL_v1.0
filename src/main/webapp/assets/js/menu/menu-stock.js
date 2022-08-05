$(function () {

    const namespace = "#menu-stock ";
    const TOUTES = "";
    const INVENTORY_URL = "http://localhost:8080/api/v1/inventories";
    const STORE_INVENTORY_URL = "http://localhost:8080/api/v1/inventories/stores/";
    const INVENTORY_TABLE = $(namespace+"#inventory-table tbody");
    /*------------------------------
                 MENU STOCK
     -------------------------------*/
    exportToExcel(namespace + '.btn-export-to-excel','stocks-' , namespace + '#inventory-table')
    // CONST
    const QUANTITE_ALERT = 0;
    // css
    $('.btn-40').css('height', '40px');
    // Chargement des données de stock

    function fetchInventoryActivities(magasinId, articleId, uniteId) {
        let url = "http://localhost:8080/api/v1/activities/" + magasinId + "/" + articleId + "/" + uniteId;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: (data) => {
                $(namespace + "#table-operation-stock tbody").empty();
                $.each(data, (key, value) => {
                    let tr = [
                        value.reference,
                        value.typeOperation,
                        value.quantiteAjout + " " + value.unite.designation,
                        value.quantiteStockApresOperation + " " + value.unite.designation,
                        value.date,
                        value.user.nom
                    ];
                    push_to_table_list(namespace + "#table-operation-stock", key, tr);
                })
            }
        })
    }

    $(document).on('click', '.td-info-stock .btn-info-stock', function () {
        $currentArticleTr = $(this).closest('tr');
        let storeName = $currentArticleTr.children().eq(3).text();
        let categorie = $currentArticleTr.children().eq(2).text();
        let unite = $currentArticleTr.children().eq(1).text();
        let article = $currentArticleTr.children().eq(0).text();
        let id = $currentArticleTr.attr('id');
        let split = id.split("-");
        let magasinId = split[0];
        let articleId = split[1];
        let uniteId = split[2];
        $('#info-stock').attr('data-id', id);
        fetchInventoryActivities(magasinId, articleId, uniteId);

        // affectation des valeur de chaque paragraphe
        $('#info-stock p.label-magasin').text('Magasin : ' +storeName);
        $('#info-stock p.label-designation-article').text('Designation : ' +article);
        $('#info-stock p.label-unite-article').text('Unite : ' +unite);
        $('#info-stock p.label-categorie-article').text('Categorie : ' +categorie);
        $('#info-stock p.label-stock-initial-article').text('Stock Initial : ' + $currentArticleTr.children('.td-info-stock').text());
        $('#info-stock p.label-stock-final-article').text('Stock Final : ' + $currentArticleTr.children('.td-info-stock').text());
        $('#info-stock #date-debut').val(formatDate(new Date()));
        $('#info-stock #date-fin').val(formatDate(new Date()));

    })

    function getStoreInventories(url){
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function (data) {
                // Supprimer les données dans la table
                $(namespace + " #inventory-table tbody tr").empty();
                // ajouter les donnés dans la table
                $.each(data, function (key, value){
                    $tr = [value.article, value.unite,value.categorie,value.nomMagasin,value.quantite];
                    $stockId = value.magasinId + "-" + value.articleId + "-" + value.uniteId;
                    push_to_inventory_table_list(namespace + " #inventory-table",$stockId,$tr);
                });
            }
        });
    }
    // RECHERCHER
    $(document).on("keyup",namespace+"#stock-search",()=>{
        let name = $(namespace+"#stock-search").val();
        let filialeId = $(namespace+"#filiale-id").attr("value-id");
        if (name!==""){
            let url = "http://localhost:8080/api/v1/subsidiaries/"+filialeId+"/inventories/"+name;
            $.ajax({
               type: "GET",
               url : url,
               contentType: "application/json",
               success : (data)=>{
                 INVENTORY_TABLE.empty();
                 $.each(data,(key,value)=>{
                     let tr = `
                         <tr>
                                <td>`+value.article+`</td>
                                <td>`+value.unite+`</td>
                                <td>`+value.categorie+`</td>
                                <th>`+value.nomMagasin+`</th>
                                <td class="td-info-stock">
                                       <a id="`+value.magasinId+`-`+value.articleId+`-`+value.uniteId+`" type="button" class="btn-default mr-1 btn-info-stock" data-bs-toggle="modal" data-bs-target="#info-stock">`+value.quantite+``+value.unite+`</a>
                                </td>
                        </tr>
                     `;
                    INVENTORY_TABLE.append(tr);
                 });

               }

           });

        }

    })
    /*
     EVENT SELECT
     */
    $(document).on('change',"#magasin-select",function(){
        let val = $(this).val();
        let url = val===TOUTES ? INVENTORY_URL : "http://localhost:8080/api/v1/magasins/"+val+"/inventories";
        getStoreInventories(url);
    });
    /*
     button event
     */
    $(document).on('click',namespace+" #toutes-button",function () {
        getStoreInventories(INVENTORY_URL);
    });

    /*
     VALEUR DE STOCK
     */
    $('.btn-stock-valeur').click(function () {
        $('.s-value').toggle();
        $('.s-no-value').toggle();
        $montantStock = 0;
        $.each($('.table-article-stock tbody tr'), function(key, value) {
            console.log($(value).children('.article-valeur').html())
            $montantStock += parseFloat($(value).children('.article-valeur').text().replaceAll(' Ar', ''));
        })
        $('.label-valeur-stock').text("Montant total : " + $montantStock + " Ar");
    });


    /*
     click of tr
     */

    $('.table-article-stock tr').click(function () {

    })

    $('.s-value').hide();

    /*
     click stock en valeur
     */

    $('.btn-stock-valider').click(function () {
        $('.btn-stock-valeur').click();
    })
})