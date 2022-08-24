<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div id="menu-utilisateur" class="container-fluid">
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
        <h4 class="page-title">Utilisateur</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <input type="hidden" id="filiale-id" value-id="${connectedUser.filiale.id}">
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
      </div>
      <div class="d-block mt-1">
        <a type="button" id="btn-nouveau-utilisateur" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#nouveau-utilisateur"><i
                class="uil-file-plus">&nbsp;</i>Nouveau Utilisateur</a>&nbsp;
        <a type="button" class="btn btn-success mr-1 btn-nouvelle-fonction"><i
                class="uil-plus">&nbsp;</i>Nouvelle Fonction</a>
        <div class="float-end">
          <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="user-image" class="icon-excel">&nbsp;</a>&nbsp;
          <a href="" class="btn btn-primary"><i class="uil-print"></i></a>
        </div>
      </div>

    </div>
  </div>
  <!-- suite -->
  <div><br>
    <div class="row">
      <div class="col-lg-2">
        <%= start_content_table() %>
        <table id="table-liste-fonction" class="table table-sm table-hover">
          <thead>
          <th>Listes des fonctions</th>
          <th></th>
          </thead>
          <tbody>
          <c:forEach var="fonction" items="${fonctions}">
            <tr id="${fonction.id}">
              <td><c:out value="${fonction.nomFonction}"/></td>
              <td>
                <div class="d-flex align-content-center">
                  <a class="edit-fonction"><i
                          class="uil-pen"></i></a>
                  <a class="delete-fonction"><i class="uil-trash-alt"></i></a>
                </div>
              </td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
        <%= end_content_table() %>
      </div>
      <div class="col-lg-10">
        <%= start_content_table() %>
        <table id="table-liste-utilisateur" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Nom & Prenoms</th>
            <th>Nom d'utilisateur</th>
            <th>Contact</th>
            <th>Fonction</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="user" items="${users}">
            <tr id="${user.id}">
              <td><c:out value="${user.nom}"/></td>
              <td><c:out value="${user.username}"/></td>
              <td><c:out value="${user.numTel}"/></td>
              <td class="function-user"><c:out value="${user.fonction.nomFonction}"/></td>
              <td>
                <c:if test="${user.enabled}">
                  <span class="badge badge-success-lighten">activé</span>
                </c:if>
                <c:if test="${!user.enabled}">
                  <span class="badge badge-danger-lighten">desactivé</span>
                </c:if>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <a class="btn-sm btn-primary edit-utilisateur"><i class="uil-pen"></i></a>&nbsp;
                  <a class="btn-sm btn-danger delete-utilisateur"><i class="uil-trash-alt"></i></a>
                </div>
              </td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
        <%= end_content_table() %>
      </div>
      <!-- inclusion of modal -->
      <div class="all-modal">
        <%@ include file="modal/utilisateur/new-fonction.jsp" %>
        <%@ include file="modal/utilisateur/new-utilisateur.jsp" %>
      </div>
    </div>
  </div>

</div>


</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>