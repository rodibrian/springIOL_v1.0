<!-- Standard modal -->
<div id="operation-caisse" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                        <h4 class="modal-title" id="standard-modalLabel">Encaissement/Decaissement</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-1">
                            <label for="reference" class="form-label">Reference</label>
                             <input name="reference" type="text" id="reference" class="form-control">
                        </div>
                      <div class="mb-1">
                        <label for="categorie" class="form-label">Categorie</label>
                        <input name="categorie" type="text" id="categorie" class="form-control">
                      </div>
                      <div class="mb-1">
                        <label for="montant" class="form-label">Montant</label>
                        <input name="montant" type="number" id="montant" class="form-control">
                      </div>
                      <div class="mb-1">
                        <label for="description" class="form-label">Description</label>
                        <textarea name="description" id="description" cols="30" rows="3" class="form-control"></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                        <button id="saveEncDec" type="button" data-bs-dismiss="modal" class="btn btn-primary">Enregistrer</button>
                    </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->