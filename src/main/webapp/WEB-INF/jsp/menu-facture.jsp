<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid" id="menu-facture">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Facture</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-info"><i class="uil-refresh"></i></a>
          <a href="" class="btn btn-warning d-none"><i class="uil-meh-closed-eye"></i></a>
          <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control btn-40">&nbsp;&agrave;&nbsp;
        <input type="date" class="form-control btn-40">&nbsp;
        <select name="magasin" id="" class="form-select btn-40">
          <option value="0">Magasin I</option>
          <option value="0">Magasin II</option>
        </select>&nbsp;
        <h4 class="">Nombre : ${factures.size()}
        </h4>
      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/facture/info-facture.jsp" %>
    <%@ include file="modal/facture/avoir.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable"
               class="table-facture table table-sm dt-responsive nowrap table-hover table-striped">
          <thead>
          <tr>
            <th>Réference</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Operateur</th>
            <th>Date et heure</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="facture" items="${factures}">
            <tr id="${facture.reference}">
              <td>${facture.reference}</td>
              <td>${facture.client}</td>
              <td>${facture.montantTotal}</td>
              <td>${facture.operateur}</td>
              <td>${facture.date}</td>
              <td class="d-flex justify-content-center">
                <div>
                  <a class="btn-sm btn-info info-facture"><i class="uil-info-circle"></i></a>
                  <a class="btn-sm btn-success imprimer-facture"><i class="uil-print"></i></a>
                </div>
              </td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
        <!-- Collapse facture information -->
        <div class="accordion" id="accordionExample">
          <div class="card mb-0">
            <div id="facture-info" class="collapse"
                 aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body">
                <div class="close w-100 d-flex justify-content-end">
                  <button type="button" class="btn-close-info-facture btn-close pull-right" aria-label="Close"></button>
                </div>
                <div class="row" id="tab-article">
                  <div class="col-md-6">
                    <table id="facture-details-tab" class="table table-striped table-sm dt-responsive norwap">
                      <thead>
                      <th>Designation</th>
                      <th>Unite</th>
                      <th>Prix Unitaire</th>
                      <th>Quantite</th>
                      <th>Montant</th>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <h4 id="num-facture"></h4><br>
                    <h4 id="montant-facture"></h4><br>
                    <h4 id="mode-payement"></h4><br>
                    <h4 id="client-facture"></h4><br>
                    <h4 id="date-facture"></h4><br>
                    <h4 id="operateur-facture"></h4><br>
                    <button class="btn btn-danger btn-lg btn-avoir"><i class="uil-refresh"></i>&nbsp;Avoir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- End collapse facture information -->
      </div>
    </div>

  </div>


</div>

</div> <!-- container -->

</div> <!-- content -->
</div>

</div>

</div>
</div>

</div>
</div>

<!-- ============================================================== -->
<!-- End Page content -->
<!-- ============================================================== -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>