<div id="choix-magasin" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="danger-header-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content was-validated">
      <div class="modal-header modal-colored-header bg-light">
        <h4 class="modal-title" id="danger-header-modalLabel">Choix de magasin</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <select required name="choixMagasin" id="choixMagasin" class="form-select w-100 d-block">
          <c:forEach var="magasin" items="${magasins}">
            <option value="${magasin.id}">${magasin.nomMagasin}</option>
          </c:forEach>
        </select>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-secondary btn-choix-magasin" data-bs-dismiss="modal">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->