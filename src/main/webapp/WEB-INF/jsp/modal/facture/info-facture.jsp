<!-- Standard modal -->
<div id="info-facture" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Information Facture N-000000</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4 aside">
            <div class="label">
              <p>Date : <%= "30/05/22"%>
              </p>
              <p>Magasin : <%= "MagasinI"%>
              </p>
              <p>Client : <%= "nomClient"%>
              </p><br>
              <p>Operateur : <%= "nomUtilisateur"%>
              </p>
              <hr>
              <p>Montant : <%= "0Ar"%>
              </p>
              <p>Payer : <%= "OAr"%>
              </p>
              <p>Reste: <%= "0Ar"%>
              </p>
            </div>
            <button class="btn btn-success btn-block w-100 mt-2"><i class="uil-money-bill"></i>&nbsp;Changer Mode de
              paiement
            </button>
            <button class="btn btn-danger btn-creer-avoir btn-block w-100 mt-2"><i class="uil-money-bill"></i>&nbsp;
              Creer un avoir
            </button>
          </div>
          <div class="col-md-8">
            <div class="page-title-box">
              <div class="page-title-right">
                <a class="btn btn-danger btn-valider-avoir"><i class="uil-check-square"></i>&nbsp;</a>
                <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i>&nbsp;</a>
              </div>
            </div>
            <table id="table-facture-avoir" class="table table-hover table-striped norwap table-sm dt-responsive">
              <thead>
              <th>
                <div class="form-checkbox form-checkbox-danger">
                  <input type="checkbox" checked class="form-check-input avoir-checkbox-all">
                </div>
              </th>
              <th>Designation</th>
              <th>Quantite</th>
              <th>Prix Unitaire</th>
              <th>Montant</th>
              </thead>
              <tbody>
              <% for (int c = 0; c < 5; c++) { %>
              <tr>
                <td>
                  <div class="form-checkbox form-checkbox-danger">
                    <input id="" type="checkbox" checked class="form-check-input avoir-checkbox">
                  </div>
                </td>
                <td>Designation Article</td>
                <td>0</td>
                <td>0Ar</td>
                <td><%= c %></td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer d-inline-flex">
        <button type="button" class="btn btn-primary w-100 m-0"><i class="uil-print"></i>&nbsp;Imprimer</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->