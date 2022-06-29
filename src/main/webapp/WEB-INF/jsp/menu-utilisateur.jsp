<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
        <a type="button" class="btn btn-success mr-1 btn-nouvelle-fonction"><i
                class="uil-plus">&nbsp;</i>Nouvelle Fonction</a>
      </div>
    </div>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-2">
        <table id="table-liste-fonction" class="table table-sm table-hover">
          <thead>
          <th>Listes des fonctions</th>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <div class="col-lg-10">
        <table id="table-liste-utilisateur" class="table table-sm dt-responsive nowrap table-hover">
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

          </tbody>
        </table>
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