<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid" id="menu-detail-vente">

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
          <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" id="begin-date-input" class="form-control">
        <input type="date" id="end-date-input" class="form-control">
          <a type="button" id="search-button" class="btn btn-success mr-1"><i class="uil-search-alt"></i></a>
        <input type="text" id="nom-input" class="form-control" placeholder="Nom">
          <select name="magasin" id="type-filter" class="form-select">
            <option value="CLIENT">NOM CLIENT</option>
            <option value="ARTICLE">NOM ARTICLE</option>
              <option value="DATE">DATE</option>
          </select><br>
          <select name="magasin" id="magasin-select-operation" class="form-select">
              <c:forEach var="magasin" items="${magasins}">
                  <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
              </c:forEach>
          </select>
          <br>
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
            <table id="details-vente-table" class="table-detail-vente table-special-form table table-sm dt-responsive nowrap table-hover">
                  <thead>
                          <tr>
                            <th>Réference</th>
                            <th>Client</th>
                            <th>Article</th>
                            <th>Unite</th>
                            <th>Quantite</th>
                            <th>Prix Unitaire (Ar) </th>
                            <th>Montant (Ar) </th>
                            <th>Date</th>
                          </tr>
                  </thead>
                  <tbody>
                      <c:forEach var="vente" items="${sales}">
                            <tr id ="${vente.id}">
                                  <td><c:out value="${vente.infoArticleMagasin.reference}"/></td>
                                  <td><c:out value="${vente.client.nom}"/></td>
                                  <td><c:out value="${vente.infoArticleMagasin.article.designation}"/></td>
                                  <td><c:out value="${vente.infoArticleMagasin.unite.designation}"/></td>
                                  <td ><c:out value="${vente.infoArticleMagasin.quantiteAjout}"/></td>
                                  <td ><c:out value="${vente.montantVente/vente.infoArticleMagasin.quantiteAjout}"/></td>
                                  <td ><c:out value="${vente.montantVente}"/></td>
                                  <td><c:out value="${vente.infoArticleMagasin.date}"/>  </td>
                            </tr>
                      </c:forEach>
                  </tbody>
            </table>
      </div>
    </div>
  </div>


</div>

</div> <!-- container -->


<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>