<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid" id="menu-peremption">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <div class="input-group">
            <input type="text" required class="form-control dropdown-toggle" placeholder="Search..." id="top-search">
            <button class="input-group-text btn-primary" type="submit"><i class="uil-search"></i></button>
          </div>
        </div>
        <h4 class="page-title">Peremption</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary" role="button" data-bs-toggle="modal" data-bs-target="#modal-liste-article"><i
                  class="uil-plus"></i>&nbsp;</a>
          <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a href="" role="btn" class="btn btn-outline-primary mr-1">Tout</a>
        <a href="" role="btn" class="btn btn-outline-info mr-1">Forte</a>
        <a href="" role="btn" class="btn btn-outline-success mr-1">Moyenne</a>
        <a href="" role="btn" class="btn btn-outline-warning mr-1">Faible</a>
        <a href="" role="btn" class="btn btn-outline-danger mr-1">P&eacute;rim&eacute;</a>
      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/vente/list-article.jsp" %>
    <%@ include file="modal/date-peremption.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid">
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable" class="table-peremption table table-sm dt-responsive nowrap table-hover table-striped">
          <thead>
          <tr>
            <th>Designation</th>
            <th>Unite</th>
            <th>Quantite en stock</th>
            <th>Date de peremption</th>
            <th>Etat</th>
          </tr>
          </thead>
          <tbody>
              <c:forEach var="au" items="${expirations}">
                <tr>
                  <td>${au.nomArticle}</td>
                  <td>${au.nomUnite}</td>
                  <td>${au.quantitePeremetion}</td>
                  <td>${au.datePeremption}</td>
                  <td><span class="badge badge-danger-lighten">p&eacute;rim&eacute;</span></td>
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