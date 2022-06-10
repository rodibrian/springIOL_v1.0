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
              <label for="nom" class="form-label">Nom</label>
              <input name="nom" type="text" id="nom" class="form-control">
            </div>
            <div class="col-6">
              <label for="prenoms" class="form-label">Prenoms</label>
              <input name="prenoms" type="text" id="prenoms" class="form-control">
            </div>
          </div>

        </div>
        <div class="mb-1">
          <div class="row">
            <div class="col-6">
              <label for="nom" class="form-label">Adresse</label>
              <input name="nom" type="text" id="adresse" class="form-control">
            </div>
            <div class="col-6">
              <label for="prenoms" class="form-label">Contact</label>
              <input name="prenoms" type="text" id="contact" class="form-control">
            </div>
          </div>

        </div>
        <div class="mb-1">
          <div class="row">
            <div class="col-6">
              <label for="nom" class="form-label">Fonction</label>
              <select name="fonction" id="" class="form-select">
                <option value="fonction I"></option>
                <option value="fonction II"></option>
              </select>
            </div>
            <div class="col-6">
              <label for="prenoms" class="form-label">Magasin</label>
              <select name="magasin" id="" class="form-select">
                <option value="Magasin I"></option>
                <option value="Magasin II"></option>
              </select>
            </div>
          </div>

        </div>
        <div class="mb-1">
          <label for="username" class="form-label">Nom d'utilisateur</label>
          <input name="username" type="text" id="username" class="form-control">
        </div>
        <div class="mb-1">
          <label for="password" class="form-label">Mot de passe</label>
          <input name="password" type="password" id="password" class="form-control">
        </div>
        <div class="mb-1">
          <div class="mt-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="customCheck1" checked="">
              <label class="form-check-label" for="customCheck1">Statut utilisateur</label>
            </div>
          </div>
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