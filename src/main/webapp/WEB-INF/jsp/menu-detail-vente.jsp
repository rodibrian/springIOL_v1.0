<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Detail de vente</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-info"><i class="uil-pen"></i></a>
          <a href="" class="btn btn-danger"><i class="uil-trash-alt"></i></a>
          <a href="" class="btn btn-warning"><i class="uil-eye-slash"></i></a>
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control">&nbsp;
        <input type="date" class="form-control">&nbsp;
        <input type="text" class="form-control" placeholder="Nom du client">&nbsp;
        <input type="text" class="form-control" placeholder="Nom d'article">
        <a type="button" class="btn btn-success mr-1">
          <i class="uil-search-alt"></i>
        </a>
      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/new-article.jsp" %>
    <%@ include file="modal/new-categorie.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Réference</th>
            <th>Client</th>
            <th>Article</th>
            <th>Unite</th>
            <th>Quantite</th>
            <th>Prix Unitaire</th>
            <th>Montant</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 10; i++) { %>
          <tr>
            <td>Ref 000 000 000 00</td>
            <td>Nom du Client</td>
            <td>Designation d'article</td>
            <td>unite</td>
            <td>00</td>
            <td>0Ar</td>
            <td>0Ar</td>
            <td>05/06/2022</td>
          </tr>
          <% } %>
          </tbody>
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