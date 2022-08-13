<%--
  Created by IntelliJ IDEA.
  User: tombo augustin
  Date: 13/08/2022
  Time: 22:56
  To change this template use File | Settings | File Templates.
--%>
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
                        <th>Designation</th>
                        <th>Unite</th>
                        <th>Stock</th>
                        <th>Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="au" items="${articles}">
                        <tr id ="${au.itemId}">
                            <td>${au.itemName}</td>
                            <td value-id ="${au.uniteId}">${au.uniteName}</td>
                            <td>${au.stock}</td>
                            <td>${au.price}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->