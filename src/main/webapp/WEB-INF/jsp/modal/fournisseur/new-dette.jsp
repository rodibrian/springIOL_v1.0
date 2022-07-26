<!-- Standard modal -->
<div id="nouveau-dette" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content was-validated">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau Dette</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-1">
          <label for="nomFournisseur" class="form-label">Nom du Fournisseur</label>
          <input name="nomClient" type="text" id="nomFournisseur" class="form-control" value="nomDuFournisseur">
        </div>
        <div class="mb-1">
          <label for="somme" class="form-label">Montant</label>
          <input name="somme" type="number" required id="somme" class="form-control">
        </div>

        <div class="mb-1">
          <label for="description" class="form-label">Description</label>
          <textarea name="description" id="description" class="form-control"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button id="btn-enregistrer-dette-fournisseur" data-bs-dismiss="modal" type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->