<!-- Standard modal -->
<div id="info-stock" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Information Stock</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4 aside">
            <div class="label">
              <p>Magasin : <%= "nomMagasin"%>
              </p>
              <p>Code : <%= "code"%>
              </p>
              <p>Designation : <%= "designation"%>
              </p>
              <p>Unite : <%= "unite"%>
              </p>
              <p>Stock Initial : <%= "00"%>
              </p>
              <p>Stock Final : <%= "00"%>
              </p>
              <p>Quantité d'alerte : <%= "00"%>
              </p>
            </div>
            <div class="filter-date">
              <label for="date-debut">Date debut</label>
              <input id="date-debut" type="date" class="form-control">
              <label for="date-fin">Date Fin</label>
              <input id="date-fin" type="date" class="form-control">
            </div>
            <button class="btn btn-success btn-block w-100 mt-2"><i class="uil-check-square"></i>Valider</button>
          </div>
          <div class="col-md-8">
            <div class="page-title-box">
              <div class="page-title-right">
                <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
              </div>
            </div>
            <table id="table-operation-stock" class="table table-hover table-striped norwap table-sm dt-responsive">
              <thead>
              <th>Numero</th>
              <th>Date</th>
              <th>Operation</th>
              <th>Entree</th>
              <th>Sortie</th>
              <th>Stock</th>
              <th>Operateur</th>
              </thead>
              <tbody>
              <% for (int c = 0; c < 5; c++) { %>
              <tr>
                <td>0</td>
                <td>30/05/22</td>
                <td>Operation</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>utilisateur</td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer d-inline-flex">
        <button type="button" class="btn btn-warning w-50 m-0">Mettre à jour stock</button>
        <button type="button" class="btn btn-primary w-50 m-0">Modifier Quantité d'alerte</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->