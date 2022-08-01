<!-- Large modal -->
<div class="modal fade" id="modal-liste-fournisseur" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content was-validated bg-light text-dark">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Fournisseur</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input type="text" id="inpute-article-search" name="example-input-large" class="form-control w-100 d-block"
                 placeholder="fournisseur &agrave; recherch&eacute;">
        </div>
        <hr>
        <table id="table-liste-fournisseur" class="table table-special-form table-sm dt-responsive nowrap w-100">
          <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Contact</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="cf" items="${cfList}">
            <tr id="${cf.id}">
              <td><c:out value="${cf.nom}"/></td>
              <td><c:out value="${cf.adresse}"/></td>
              <td><c:out value="${cf.numTel}"/></td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->