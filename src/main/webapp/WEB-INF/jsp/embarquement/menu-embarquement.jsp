<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="../template/header.jsp" %>
<!-- Start Content-->
<div class="container-fluid" id="menu-embarquement">
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
        <h4 class="page-title">Embarquement</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="export-to-excel"/> &nbsp;</a>&nbsp;
          <a href="" class="btn btn-primary"><i class="uil-print"></i></a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1" href="/embarquement-nouveau" target="_blank"><i
                class="uil-file-plus">&nbsp;</i>Nouveau Embarquement</a>
      </div>
    </div>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-3">
        <table id="voyageTabList" class="table table-sm table-hover">
          <thead>
          <th>Listes des voyages</th>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) {%>
          <tr id="">
            <td>voyage</td>
            <td>
              <div class="d-inline-flex justify-content-center">
                <a data-bs-toggle="modal" data-bs-target="#standard-modal2" href="#" class="editVOyage"><i
                        class="uil-pen"></i></a>
                <a href="#" class="deleteVoyage"><i class="uil-trash-alt"></i></a>
              </div>&nbsp;
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
      <div class="col-lg-9">
        <table id="liste-embarquement" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Magasin</th>
            <th>Facture</th>
            <th>Designation</th>
            <th>Prix d'achat</th>
            <th>Prix de Vente</th>
            <th>Quantite</th>
            <th>Poids en T</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td>Nom du magasin</td>
            <td>ref-00000</td>
            <td>designationArticle</td>
            <td>0Ar</td>
            <td>0Ar</td>
            <td>0</td>
            <td>0T</td>
            <td class="d-flex justify-content-center">
              <div>
                <a id="" class="btn-sm btn-danger deleteArticle "><i class="uil-trash-alt"></i></a>
              </div>
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>
        <div class="info-poids ml-2">
          <h4>Poids total : <strong>0T</strong></h4>
        </div>
      </div>
    </div>
  </div>

</div>

</div> <!-- container -->

<%@ include file="../template/footer.jsp" %>
<%@ include file="../template/setting.jsp" %>