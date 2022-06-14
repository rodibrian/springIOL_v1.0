<!-- Standard modal -->
<div id="info-prix" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="standard-modalLabel">Mis à jour Prix</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4 aside">
            <div class="label">
              <p class=" d-flex justify-content-center"><i class="uil-box uil-size-40"></i>
              </p>
              <p class="text-center"><%= "Designation Article"%>
              </p>
              <p class="text-center">(<%= "unite"%>)
              </p>
              <p class="text-center">Date : <%= "02/06/2022"%>
              </p>
              <hr>

              <div class="d-inline-flex">
                <input type="text" class="form-control text-right w-75 mr-1" placeholder="" value="0Ar">

                <button class="btn btn-success w-25"><i class="uil-money-insert"></i></button>
              </div>


            </div>
          </div>
          <div class="col-md-8">
            <div class="page-title-box">
              <div class="page-title-right">
                <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
              </div>
            </div>
            <table id="table-facture-avoir" class="table table-hover table-striped norwap table-sm dt-responsive">
              <thead>
              <th>Date</th>
              <th>Montant</th>
              <th>Utilisateur</th>
              </thead>
              <tbody>
              <% for (int c = 0; c < 5; c++) { %>
              <tr>
                <td>02/06/2022</td>
                <td>0Ar</td>
                <td>nomUtilisateur</td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer d-inline-flex">
        <button type="button" class="btn btn-default w-100 m-0" data-bs-dismiss="modal"><i class="uil-exit"></i>&nbsp;Fin
          de modification
        </button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->