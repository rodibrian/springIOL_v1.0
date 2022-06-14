<!-- Large modal -->
<div class="modal fade" id="modal-liste-client" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content bg-light text-dark">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Client</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input type="text" id="input-client-search" name="example-input-large" class="form-control w-100 d-block"
                 placeholder="Client &agrave; recherch&eacute;">
        </div>
        <hr>
        <table id="table-liste-client" class="table table-special-form table-sm dt-responsive nowrap w-100">
          <thead>
          <tr>
            <th>Nom & Prenoms</th>
            <th>Adresse</th>
            <th>Contact</th>
          </tr>
          </thead>

          <tbody>


          <% for (int i = 0; i < 10; i++) { %>
          <tr id="client-<%= i %>">
            <td>Nom et prenoms</td>
            <td>adresse du client</td>
            <td>+261 00 00 000 00</td>
          </tr>
          <% } %>

          </tbody>
        </table>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->