<!-- Large modal -->
<div class="modal fade" id="modal-liste-article" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content bg-light text-dark">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Article</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input type="text" id="inpute-article-search" name="example-input-large" class="form-control w-100 d-block"
                 placeholder="article &agrave; recherch&eacute;">
        </div>
        <hr>
        <table id="table-liste-article" class="table table-special-form table-sm dt-responsive nowrap w-100">
          <thead>
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Unite</th>
            <th>Quantite</th>
            <th>Prix Unitaire</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="article" items="${articles}">
            <c:forEach var="unite" items="${article.getUnite()}">
              <tr id ="${article.id}">
                <td><c:out value="${unite.code}"/></td>
                <td><c:out value="${article.designation}"/></td>
                <td><c:out value="${unite.designation}"/></td>
                <td><c:out value="${unite.quantite}"/></td>
                <td><c:out value="${unite.poids}"/></td>
                <td><c:out value="${article.getCategorie().getLibelle()}"/></td>
                <td class="d-flex justify-content-center">
                  <div>
                    <a id="${article.id}" data-bs-toggle="modal" data-bs-target="#new-article"
                       class="btn-sm btn-info editArticleBtn"><i class="uil-pen"></i></a>
                    <a id="${article.id}" class="btn-sm btn-danger deleteArticleBtn "><i class="uil-trash-alt"></i></a>
                    <a id="${article.id}" class="btn-sm btn-warning hideArticleBtn"><i class="uil-eye-slash"></i></a>
                  </div>
                </td>
              </tr>
            </c:forEach>
          </c:forEach>
          </tbody>
        </table>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->