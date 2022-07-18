$(function() {
    let namespace = "#menu-article ";

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
    // masquer article
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
})