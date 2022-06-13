<%@ include file='../template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Listes des operations</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control">&nbsp;
        <input type="date" class="form-control">&nbsp;
        <select name="magasin" id="magasin" class="form-select">
          <option value="1">Magasin I</option>
          <option value="2">Magasin II</option>
        </select>
        <a type="button" class="btn btn-success mr-1">
          <i class="uil-search-alt"></i>
        </a>
      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="../modal/new-article.jsp" %>
    <%@ include file="../modal/new-categorie.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Réference</th>
            <th>Designaition</th>
            <th>Operation</th>
            <th>Entree</th>
            <th>Sortie</th>
            <th>Stock</th>
            <th>Date</th>
            <th>Description</th>
            <th>Operateur</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 10; i++) { %>
          <tr>
            <td>Ref 000 000 000 00</td>
            <td>Designation d'article</td>
            <td>nomOperation</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
            <td>05/06/2022</td>
            <td>aucun description</td>
            <td>nomdutilisateur</td>          </tr>
          <% } %>
          </tbody>
      </div>
    </div>
  </div>


</div>

</div> <!-- container -->


<%@ include file="../template/footer.jsp" %>
<%@ include file="../template/setting.jsp" %>