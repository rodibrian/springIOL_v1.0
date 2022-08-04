<!-- Standard modal -->
<div id="new-magasin" data-type="nouveau" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="standard-modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau magasin</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="nomMagasin" class="form-label">Nom du magasin</label>
          <input name="nomMagasin" type="text" id="nomMagasin" class="form-control">
          <div class="invalid-feedback">veuillez remplir le champ nom magasin</div>
        </div>
        <div class="mb-3">
          <label for="adresseMagasin" class="form-label">Adresse du magasin</label>
          <input name="adresseMagasin" type="text" id="adresseMagasin" class="form-control">
          <div class="invalid-feedback">veuillez remplir l'adresse du magasin</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-magasin" type="submit" class="btn btn-primary">Enregistrer
        </button>
      </div>
    </form><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->
