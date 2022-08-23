<!-- Standard modal -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div id="info-facture" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="num-facture"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <input type="hidden" id="user-id" value-id="${connectedUser.id}">
      <input type="hidden" id="filiale-id" value-id="${connectedUser.filiale.id}">
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4 aside">
            <div class="label">
              <p id="client-facture"></p><br>
              <p id="date-facture"></p>
              <hr>
              <p id="operateur-facture"></p>
              <p id="mode-payement"></p>
              <p id="montant-facture"></p>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#mode-payement-modal" class="btn btn-success btn-block w-100 mt-2"><i class="uil-money-bill"></i>&nbsp;Changer Mode de
              paiement
            </button>
            <button class="btn btn-danger btn-creer-avoir btn-block w-100 mt-2"><i class="uil-money-bill"></i>&nbsp;
              Creer un avoir
            </button>
          </div>
          <div class="col-md-8">
            <div class="page-title-box">
              <div class="page-title-right">
                <a class="btn btn-danger btn-valider-avoir"><i class="uil-check-square"></i>&nbsp;Valider</a>
                <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="user-image" class="icon-excel">&nbsp;</a>
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
              <th>Unité</th>
              <th>Quantite</th>
              <th>Prix Unitaire</th>
              <th>Montant</th>
              </thead>
              <tbody>
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