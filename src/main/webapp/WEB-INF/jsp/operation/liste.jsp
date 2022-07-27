<%@ include file='../template/header.jsp' %>
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
        <input type="date" class="form-control">&nbsp;
        <input type="date" class="form-control">&nbsp;
        <select name="magasin" id="magasin" class="form-select">
          <c:forEach var="magasin" items="${magasins}">
            <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
          </c:forEach>
        </select>
        <select name="operation" id="operation" class="form-select">
          <option>Entrée</option>
          <option>Sortie</option>
          <option>Transfert</option>
          <option>Inventaire</option>
        </select>
        <a type="button" class="btn btn-
        success mr-1">
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

          <c:forEach var="transfert" items="${transferts}">
            <tr id="${transfert.id}">
              <td><c:out value="${transfert.reference}"/></td>
              <td><c:out value="${transfert.article.designation}"/></td>
              <td><c:out value="${transfert.unite.designation}"/></td>
              <td>TRANSFERT</td>
              <td><c:out value="${transfert.quantite}"/></td>
              <td> - </td>
              <td><c:out value="${transfert.date}"/></td>
              <td><c:out value="${transfert.description}"/></td>
              <td><c:out value="${transfert.user.nom}"/></td>
            </tr>
          </c:forEach>

          <c:forEach var="sortie" items="${sorties}">
            <tr id="${sortie.id}">
              <td><c:out value="${sortie.reference}"/></td>
              <td><c:out value="${sortie.article.designation}"/></td>
              <td><c:out value="${sortie.unite.designation}"/></td>
              <td>SORTIE</td>
              <td><c:out value="${sortie.quantite}"/></td>
              <td> - </td>
              <td><c:out value="${sortie.date}"/></td>
              <td><c:out value="${sortie.description}"/></td>
              <td><c:out value="${sortie.user.nom}"/></td>
            </tr>
          </c:forEach>

          <c:forEach var="supply" items="${supplies}">
            <tr id="${supply.id}">
              <td><c:out value="${supply.reference}"/></td>
              <td><c:out value="${supply.article.designation}"/></td>
              <td><c:out value="${supply.unite.designation}"/></td>
              <td>ENTREE</td>
              <td><c:out value="${supply.quantite}"/></td>
              <td> - </td>
              <td><c:out value="${supply.dateApprov}"/></td>
              <td><c:out value="${supply.description}"/></td>
              <td><c:out value="${supply.user.nom}"/></td>
            </tr>
          </c:forEach>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div> <!-- container -->