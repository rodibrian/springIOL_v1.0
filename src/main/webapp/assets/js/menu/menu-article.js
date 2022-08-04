$(function() {
    let namespace = "#menu-article ";
    let ressource = "http://localhost:8080/api/v1/subsidiaries/";
    $item_table = $("#articleTable tbody");
    //
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
    // suppression article
    // $(document).on('click',namespace + '#articleTable .deleteArticleBtn', function() {
    //     $codeArticle = $(this).closest('tr').children().eq(0).text();
    //     $trCurrent = $(this).closest('tr');
    //     $modalId = "suppression-article";
    //     create_confirm_dialog('Suppression Article', 'Voulez vraiment supprimer cet article (id:' + $codeArticle + ') ?', $modalId, "Oui, supprimer", "btn-danger")
    //         .on('click', function() {
    //             $trCurrent.remove();
    //             hideAndRemove(namespace + '#' + $modalId + '');
    //         })
    // })
    // // masquer article
    // $(document).on('click',namespace + '#articleTable .hideArticleBtn', function() {
    //     $codeArticle = $(this).closest('tr').children().eq(0).text();
    //     $trCurrent = $(this).closest('tr');
    //
    //     $modalId = "masquer-article";
    //     create_confirm_dialog('Masquer Article', 'Voulez vraiment masquer cet article (id:' + $codeArticle + ') ?', $modalId, "Oui, masquer", "btn-warning")
    //         .on('click', function() {
    //             $trCurrent.hide();
    //             hideAndRemove(namespace + '#' + $modalId + '');
    //         })
    // })
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