<!-- Standard modal -->
<div id="sauvegarde" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content was-validated">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Sauvegarde ou restaure</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6 text-center">
            <span><i class="uil-database uil-size-40"></i></span>
            <h3>Sauvegarde la base donn&eacute;e</h3>
            <div class="form-check form-checkbox-success mb-3">
              <input type="checkbox" class="form-check-input" id="archive" checked>
              <label class="form-check-label" for="archive">Mettre dans un archive</label>
            </div>

          </div>
          <div class="col-md-6 text-center">
            <span><i class="uil-refresh uil-size-40"></i></span>
            <h3>Restauration la base donn&eacute;e</h3>
            <p class="text-muted">Veuillez inverser votre base de donn&eacute;e ici!</p>
            <input type="file" class="form-control" id="file-db" checked>

          </div>
        </div>
        <div class="row mt-1">
          <div class="col-md-6">
            <button class="btn btn-success w-100 btn-md"><i class="uil-database"></i>&nbsp;Sauvegarder</button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-success w-100 btn-md"><i class="uil-refresh"></i>&nbsp;Restaurer</button>
          </div>
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->