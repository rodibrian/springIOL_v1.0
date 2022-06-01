<!-- Standard modal -->
<div id="new-article" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Nouveau Article</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="designation" class="form-label">Designation</label>
          <input type="text" id="designation" class="form-control">
        </div>
        <div class="mb-3">
          <label for="categorie" class="form-label">Categorie</label>
          <select class="form-select" id="categorie">
          </select>
        </div>
        <div class="mb-3">
          <label for="table-unite" class="form-label text-underline">Unite</label>
          <table id="table-unite" class="table w-100 d-block table-unit table-bordered border-primary table-centered table-hover">
            <thead>
            <tr>
              <th>Code</th>
              <th>Niveau</th>
              <th>Designation</th>
              <th>Quantite</th>
              <th>Poids(Kg)</th>
              <th>Action</th>
            </tr>
            <tr>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" class="form-control input-sm" value="test"></td>
              <td><input type="text" class="form-control input-sm" value="0"></td>
              <td><input type="text" class="form-control input-sm" value="article designation"></td>
              <td><input type="text" class="form-control input-sm" value="0"></td>
              <td><input type="text" class="form-control input-sm" value="0"></td>
              <td class="d-inline-flex">
                <a class="btn btn-primary btn-sm btn-edit-unite" id="edit_1"><i class="uil-pen"></i></a>&nbsp;
                <a class="btn btn-danger btn-sm btn-del-unite" id="del_1"><i class="uil-trash-alt"></i></a>&nbsp;
                <a class="btn btn-success btn-sm btn-add-unite" id="add_1"><i class="uil-check-square"></i></a>&nbsp;
              </td>
            </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <a class="btn btn-success" id="btn-new-unite"><i class="uil-plus"></i></a>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
        <button type="button" id="saveArticleBtn" data-bs-dismiss="modal" class="btn btn-primary">Enregistrer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->