$(function() {
    let namespace = "#menu-article ";
    let ressource = "http://localhost:8080/api/v1/subsidiaries/";
    $item_table = $("#articleTable tbody");
    // generer barcode
    $(namespace + '#articleTable tbody tr').each(function(v,k) {
        $article_code = $(this).find('.barcode-list-articles .text').text();
        $(this).find('.barcode-list-articles .text').text('');
        $(this).find('.barcode-list-articles').append('' +
            '<svg id="barcode-'+$article_code+'" class="barcode-articles-list"></svg>');
        $codebar  = generate_barcode_text($article_code);
        JsBarcode('#barcode-' + $article_code, $codebar)
    })

    // afficher, masquer code bar

    $('.barcode-list-articles').toggle() // hidden barcode default
    $(namespace + '#btn-barcode-toggle').on('click', function() {
        $('.barcode-list-articles').toggle()
        $(this).children('.uil').toggleClass('uil-eye-slash')
        $(this).children('.uil').toggleClass('uil-eye')
    })

    // event on click
    $(document).on('click', '.barcode-list-articles', function() {
        $row = $(this).parent();
        $societe = {code : '1', text: 'Societe 1'};
        $article = {code : $row.children().eq(1).attr('value-id'), text : $row.children().eq(1).text()}
        $categorie = {code : $row.children().eq(2).attr('value-id'), text : $row.children().eq(2).text()}
        $unite = {code : $row.children().eq(4).attr('value-id'), text : $row.children().eq(4).text()}
        $(namespace + '#info-barcode .title-article').text('Information article')

        $(namespace + '#info-barcode .l-societe').text($societe.text + ' (' + numberToStringZero($societe.code , 4)+ ')')
        $(namespace + '#info-barcode .l-article').text($article.text + ' (' + numberToStringZero($article.code, 6) + ')')
        $(namespace + '#info-barcode .l-categorie').text($categorie.text + ' (' + numberToStringZero($categorie.code, 3) + ')')
        $(namespace + '#info-barcode .l-unite').text($unite.text + ' (' + numberToStringZero($unite.code, 2) + ')')

        $codebar = $societe.code + '-' + $categorie.code + '-' + $article.code + '-' + $unite.code;
        JsBarcode('#info-barcode-svg', generate_barcode_text($codebar));

        $(namespace + '#info-barcode').modal('show')
    })

    //export
    exportToExcel(namespace + '.btn-export-to-excel','articles-' , namespace + '#articleTable');
    // RECHERCHER ARTICLE
    $(document).on("keyup",namespace+"#top-search",()=>{
        let text = $(namespace+"#top-search").val();
        let filialeId = $(namespace+"#filiale-id").attr("value-id");
        $.ajax({
            type : "GET",
            url : ressource+filialeId+"/items/"+text,
            contentType : "application/json",
            success : (data) => {
                appendItem(data);
            }
        })
    })
    //  ACTUALISER LISTE DES ARTICLES
    $(namespace+"#refresh-btn").click(()=>{
        let filialeId = $(namespace+"#filiale-id").attr("value-id");
        $.ajax({
            type : "GET",
            url : ressource+filialeId+"/items",
            contentType : "application/json",
            success : (data) => {
                appendItem(data);
            }
        })
    })

    function appendItem(data) {
        $item_table.empty();
        $.each(data, (key, value) => {
            let tableRow = `
                             <tr id=` + value.article.id + `>
                                <td>` + value.article.designation + `</td>
                                <td>` + value.article.categorie.libelle + `</td>
                                <td>` + value.unite.code + `</td>
                                <td>` + value.poids + `</td>
                                <td>` + value.unite.designation + `</td>
                                <td>` + value.quantiteNiveau + `</td>
                                <td>
                                            <div>
                                                <a id="` + value.article.id + `" class="btn-sm btn-info editArticleBtn"><i class="uil-pen"></i></a>
                                                <a id="` + value.article.id + `"  class="btn-sm btn-danger deleteArticleBtn "><i class="uil-trash-alt"></i></a>
                                                <a id="` + value.article.id + `"  class="btn-sm btn-warning hideArticleBtn"><i class="uil-eye-slash"></i></a>
                                            </div>
                                </td>
                            </tr>`;
            $item_table.append(tableRow);
        })
    }
})