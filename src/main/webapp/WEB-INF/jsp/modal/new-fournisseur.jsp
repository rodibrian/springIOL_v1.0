<!-- Standard modal -->
<div id="nouveau-fournisseur" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau Fournisseur</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-1">
          <label for="nom" class="form-label">Nom & Prenoms</label>
          <input name="nom" type="text" id="nom" class="form-control">
        </div>
        <div class="mb-1">
          <label for="adresse" class="form-label">Adresse</label>
          <input name="adresse" type="text" id="adresse" class="form-control">
        </div>
        <div class="mb-1">
          <label for="contact" class="form-label">Contact</label>
          <input name="contact" type="text" id="contact" class="form-control">
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