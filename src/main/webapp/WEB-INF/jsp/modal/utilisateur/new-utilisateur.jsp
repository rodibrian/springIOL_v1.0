<!-- Standard modal -->
<div id="nouveau-utilisateur" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau utilisatuer</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-1">
          <div class="row">
            <div class="col-6">
              <label for="input-nom" class="form-label">Nom</label>
              <input name="nom" type="text" id="input-nom" class="form-control">
            </div>
            <div class="col-6">
              <label for="input-prenoms" class="form-label">Prenoms</label>
              <input name="prenoms" type="text" id="input-prenoms" class="form-control">
            </div>
          </div>

        </div>
        <div class="mb-1">
          <div class="row">
            <div class="col-6">
              <label for="input-adresse" class="form-label">Adresse</label>
              <input name="nom" type="text" id="input-adresse" class="form-control">
            </div>
            <div class="col-6">
              <label for="input-contact" class="form-label">Contact</label>
              <input name="prenoms" type="text" id="input-contact" class="form-control">
            </div>
          </div>

        </div>
        <div class="mb-1">
          <div class="row">
            <div class="col-6">
              <label for="select-fonction" class="form-label">Fonction</label>
              <select name="fonction" id="select-fonction" class="form-select">
              </select>
            </div>
            <div class="col-6">
              <label for="select-magasin" class="form-label">Magasin</label>
              <select name="magasin" id="select-magasin" class="form-select">
              </select>
            </div>
          </div>

        </div>
        <div class="mb-1">
          <label for="input-username" class="form-label">Nom d'utilisateur</label>
          <input name="input-username" type="text" id="input-username" class="form-control">
        </div>
        <div class="mb-1">
          <label for="input-password" class="form-label">Mot de passe</label>
          <input name="input-password" type="password" id="input-password" class="form-control">
        </div>
        <div class="mb-1">
          <div class="mt-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="check-statut" checked="">
              <label class="form-check-label" for="check-statut">Statut utilisateur</label>
            </div>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-utilisateur" data-bs-dismiss="modal" type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->