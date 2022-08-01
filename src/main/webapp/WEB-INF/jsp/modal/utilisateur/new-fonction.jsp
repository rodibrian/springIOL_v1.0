<!-- Standard modal -->
<div id="nouvelle-fonction" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content was-validated">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouvelle Fonction</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="libelle-fonction" class="form-label">Libelle</label>
          <input name="nomCategorie" type="text" required id="libelle-fonction" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-fonction" type="button" data-bs-dismiss="modal" class="btn btn-primary">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->