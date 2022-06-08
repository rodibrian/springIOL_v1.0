<!-- Standard modal -->
<div id="new-magasin" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="standard-modalLabel">Nouveau magasin</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nomCategorie" class="form-label">Nom du magasin</label>
                             <input name="nomCategorie" type="text" id="nomMagasin" class="form-control">
                        </div>
                      <div class="mb-3">
                        <label for="nomCategorie" class="form-label">Adresse du magasin</label>
                        <input name="nomCategorie" type="text" id="adresseMagasin" class="form-control">
                      </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                        <button id="saveMagasinBtn" data-bs-dismiss="modal" type="button" class="btn btn-primary">Enregistrer</button>
                    </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->