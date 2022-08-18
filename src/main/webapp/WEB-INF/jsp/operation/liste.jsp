<%@ include file='../template/header.jsp' %>
<%@ page contentType="text/html; charset=UTF-8" %>
<i class="no-title" title="Liste"></i>

<!-- Start Content-->
<div id="liste-operation" class="container-fluid">

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
          <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="export-to-excel"/> &nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">

          <input type="date" id="begin-date-input" class="form-control">&nbsp;

          <input type="date" id="end-date-input" class="form-control">&nbsp;

          <a type="button" id="search-button" class="btn btn-success mr-1">
              <i class="uil-search-alt"></i>
          </a>

        <select name="magasin" id="magasin-select-operation" class="form-select">
          <c:forEach var="magasin" items="${magasins}">
            <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
          </c:forEach>
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
        <table id="scroll-vertical-datatable" class="table-liste-operation table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Réference</th>
            <th>Designation</th>
            <th>Unite</th>
            <th>Operation</th>
            <th>quantite</th>
            <th>Stock aprés operation</th>
            <th>Date</th>
            <th>Description</th>
            <th>Operateur</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="operation" items="${operations}">
            <tr id="${operation.id}">
              <td>${operation.reference}</td>
              <td>${operation.article.designation}</td>
              <td>${operation.unite.designation}</td>
              <td>${operation.typeOperation}</td>
              <td>${operation.quantiteAjout} ${operation.unite.designation}</td>
              <td>${operation.quantiteStockApresOperation} ${operation.unite.designation}</td>
              <td>${operation.date}</td>
              <td>${operation.description}</td>
              <td>${operation.user.nom}</td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</div>

</div> <!-- container -->


<%@ include file="../template/footer.jsp" %>
<%@ include file="../template/setting.jsp" %>