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
        <h4 class="page-title">Fournisseur</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary"><i class="uil-refresh"></i></a>&nbsp;
          <a href="" class="btn btn-success"><i class="uil-navigator"></i></a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#nouveau-fournisseur"><i
                class="uil-plus">&nbsp;</i>Nouveau Fournisseur</a>

      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/new-fournisseur.jsp" %>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">

      <div class="col-lg-12">
        <table id="table-fournisseur" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Nom & Prenoms</th>
            <th>Adresse</th>
            <th>Contact</th>
            <th>Compte</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td>nomEtPrenomsFournisseur</td>
            <td>adresseFournisseur</td>
            <td>+261 00 00 000 00</td>
            <td></td>
            <td>
              <div class="action-fournisseur">
                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>
                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>
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

</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>