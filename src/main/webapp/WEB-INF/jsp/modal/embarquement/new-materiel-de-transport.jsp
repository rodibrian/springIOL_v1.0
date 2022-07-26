<!-- Standard modal -->
<div id="nouveau-materiel-de-transport" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau Mat&eacute;riel Transport</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">

        <div class="mb-1">
          <label for="reference" class="form-label">Reference</label>
          <input name="reference" type="text" id="reference" class="form-control">
        </div>
        <div class="mb-1">
          <label for="type-materiel" class="form-label">Type de mat&eacute;riel</label>
          <input name="type-materiel" type="text" id="type-materiel" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-materiel-de-transport" data-bs-dismiss="modal" type="button"
                class="btn btn-primary">Enregistrer
        </button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->