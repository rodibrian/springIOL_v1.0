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
          <c:forEach var="magasin" items="${magasins}">
            <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
          </c:forEach>
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