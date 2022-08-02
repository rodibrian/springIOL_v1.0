<!-- Large modal -->
<div class="modal fade" id="modal-liste-article" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content was-validated bg-light text-dark">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Article</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input type="text" required id="inpute-article-search" name="example-input-large" class="form-control w-100 d-block"
                 placeholder="article &agrave; recherch&eacute;">
        </div>
        <hr>
        <table id="table-liste-article" class="table table-special-form table-sm dt-responsive nowrap w-100">
          <thead>
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Unite</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="au" items="${articles}">
            <tr id ="${au[0]}">
              <td><c:out value="${au[4]}"/></td>
              <td><c:out value="${au[1]}"/></td>
              <td id="${au[3]}"><c:out value="${au[5]}"/></td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->