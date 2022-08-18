<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div id="menu-client" class="container-fluid">
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <div class="input-group">
            <input type="text" class="form-control dropdown-toggle" placeholder="Search..." id="top-search">
            <button class="input-group-text btn-primary" type="submit"><i class="uil-search"></i></button>
          </div>
        </div>
        <h4 class="page-title">Client</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary"><i class="uil-refresh"></i></a>&nbsp;
          <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="export-to-excel"/> </a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1 btn-nouveau-client"><i
                class="uil-plus">&nbsp;</i>Nouveau Client</a>

      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/client/new-client.jsp" %>
    <%@ include file="modal/client/new-credit.jsp" %>
    <%@ include file="modal/client/info-dette-cf.jsp" %>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">

      <div class="col-lg-12">
        <table id="table-client" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Nom & Prenoms</th>
            <th>Adresse</th>
            <th>Contact</th>
            <th>Crédit</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="cf" items="${cfList}">
            <tr id="${cf.id}">
              <td><c:out value="${cf.nom}"/></td>
              <td><c:out value="${cf.adresse}"/></td>
              <td><c:out value="${cf.numTel}"/></td>
              <td><c:out value="${cf.totalMontantTrosa}"/></td>
              <td>
                <div class="action-client">
                  <a class="btn-sm btn-info editClient "><i class="uil-pen"></i></a>
                  <a class="btn-sm btn-danger deleteClient "><i class="uil-trash-alt"></i></a>
                </div>
              </td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
        <!-- End collapse facture information -->
      </div>
    </div>
  </div>
</div>
</div> <!-- container -->

<%@ include file="template/setting.jsp" %>