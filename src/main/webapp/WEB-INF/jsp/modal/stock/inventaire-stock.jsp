<!-- Small modal -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="modal fade" id="modal-inventaire-stock" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-fullscreen-md-down modal-dialog-centered">
    <div class="modal-content was-validated">
      <div class="modal-header">
        <h4 class="modal-title" id="mySmallModalLabel">Inventaire de stock</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
<%--        <input type="number" required id="input-quantite-stock" class="form-control" placeholder="valeur en stock"--%>
<%--               aria-label="">--%>
        <div class="row">
          <table id="inventaire-table-unite" class="table table-hover table-striped norwap table-sm dt-responsive">
            <thead>
            <th>Unité</th>
            <th>Quantité</th>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button type="button" id="btn-enregistrer-inventaire-stock" class="btn btn-primary">Enregistrer</button>
      </div>

    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->
