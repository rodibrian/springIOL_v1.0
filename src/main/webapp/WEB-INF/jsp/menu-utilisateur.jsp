<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div class="container-fluid">
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
        <h4 class="page-title">Utilisateur</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>&nbsp;
          <a href="" class="btn btn-primary"><i class="uil-print"></i></a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#nouveau-utilisateur"><i
                class="uil-file-plus">&nbsp;</i>Nouveau Utilisateur</a>&nbsp;
        <a type="button" class="btn btn-success mr-1" href="" data-bs-toggle="modal"
           data-bs-target="#nouvelle-fonction"><i
                class="uil-plus">&nbsp;</i>Nouvelle Fonction</a>
      </div>
    </div>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-2">
        <table id="voyageTabList" class="table table-sm table-hover">
          <thead>
          <th>Listes des fonctions</th>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) {%>
          <tr id="">
            <td>fonction <%= i %>
            </td>
            <td>
              <div style="display: flex;align-content: center;">
                <a id="" data-bs-toggle="modal" data-bs-target="#standard-modal2" href="#" class="editFonction"><i
                        class="uil-pen"></i></a>
                <a id="" href="#" class="deleteFonction"><i class="uil-trash-alt"></i></a>
              </div>&nbsp;
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
      <div class="col-lg-10">
        <table id="articleTable" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Prenoms</th>
            <th>Nom d'utilisateur</th>
            <th>Contact</th>
            <th>Fonction</th>
            <th>Magasin</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td></td>
            <td>nomUser</td>
            <td>prenomsUser</td>
            <td>nomd'utilisateur</td>
            <td>+261 00 00 000 00</td>
            <td>fonctionUtilisateur</td>
            <td>Magasin I</td>
            <td><span class="badge badge-success-lighten">active</span></td>
            <td>
              <div class="d-flex justify-content-center">
                <a id="" class="btn-sm btn-primary editUser "><i class="uil-pen"></i></a>&nbsp;
                <a id="" class="btn-sm btn-danger deleteUser "><i class="uil-trash-alt"></i></a>
              </div>
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</div>


<!-- inclusion of modal -->

<div class="all-modal">
  <%@ include file="modal/utilisateur/new-fonction.jsp" %>
  <%@ include file="modal/utilisateur/new-utilisateur.jsp" %>
</div>

</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>