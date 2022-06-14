<!-- Standard modal -->
<div id="nouveau-client" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau Client</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-1">
          <label for="numCIN" class="form-label">Numero CIN</label>
          <input name="numCIN" type="text" id="numCIN" class="form-control">
        </div>
        <div class="mb-1">
          <label for="adresse" class="form-label">Adresse</label>
          <input name="adresse" type="text" id="adresse" class="form-control">
        </div>

        <div class="mb-1">
          <div class="row">
            <div class="col-md-6">
              <label for="nif" class="form-label">NIF</label>
              <input name="nif" type="text" id="nif" class="form-control">
            </div>
            <div class="col-md-6">
              <label for="stat" class="form-label">STAT</label>
              <input name="stat" type="text" id="stat" class="form-control">
            </div>
          </div>
        </div>

        <div class="mb-1">
          <label for="cif" class="form-label">CIF</label>
          <input name="cif" type="text" id="cif" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="saveMagasinBtn" data-bs-dismiss="modal" type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->