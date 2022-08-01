<!-- Standard modal -->
<div id="new-magasin" data-type="nouveau" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="standard-modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content was-validated">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau magasin</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="nom-magasin" class="form-label">Nom du magasin</label>
          <input name="nomCategorie" type="text" required id="nom-magasin" class="form-control">
          <div class="valid-feedback">valide</div>
          <div class="invalid-feedback">veuillez remplir le champ nom magasin</div>
        </div>
        <div class="mb-3">
          <label for="adresse-magasin" class="form-label">Adresse du magasin</label>
          <input name="nomCategorie" type="text" required id="adresse-magasin" class="form-control" required>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-magasin" data-bs-dismiss="modal" type="submit" class="btn btn-primary">Enregistrer
        </button>
      </div>
    </form><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->