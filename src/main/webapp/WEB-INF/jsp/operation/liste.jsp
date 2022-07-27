<%@ include file='../template/header.jsp' %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <label>
          <input type="date" class="form-control">
        </label>&nbsp;
        <label>
          <input type="date" class="form-control">
        </label>&nbsp;
        <label for="magasin">Magasin</label>
        <select name="magasin" id="magasin" class="form-select">
          <c:forEach var="magasin" items="${magasins}">
            <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
          </c:forEach>
        </select>
        <label for="operation"> Type operation </label>
        <select name="operation" id="operation" class="form-select">
          <option>Entrée</option>
          <option>Sortie</option>
          <option>Transfert</option>
          <option>Inventaire</option>
        </select>
        <a type="button" class="btn btn-success mr-1">
          <i class="uil-search-alt"></i>
        </a>
      </div>
    </div>
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
            <th>Stock</th>
            <th>Date</th>
            <th>Description</th>
            <th>Operateur</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="operation" items="${operations}">
            <tr id="${operation.id}">
              <td><c:out value="${operation.reference}"/></td>
              <td><c:out value="${operation.article.designation}"/></td>
              <td><c:out value="${operation.unite.designation}"/></td>
              <td><c:out value="${operation.typeOperation}"/></td>
              <td><c:out value="${operation.quantiteAjout}"/></td>
              <td><c:out value="${operation.quantiteStockApresOperation}"/></td>
              <td><c:out value="${operation.date}"/></td>
              <td><c:out value="${operation.description}"/></td>
              <td><c:out value="${operation.user.nom}"/></td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div> <!-- container -->