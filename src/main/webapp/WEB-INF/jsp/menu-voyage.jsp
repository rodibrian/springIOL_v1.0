<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div class="container-fluid" id="menu-voyage">
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
        <h4 class="page-title">Voyage</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i></a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1" id="btn-nouveau-voyage"><i
                class="uil-plus">&nbsp;</i>Enregistrer un voyage</a>

      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/new-voyage.jsp" %>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">

      <div class="col-lg-12">
        <table id="table-liste-voyage" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Reference</th>
            <th>Materiel de transport</th>
            <th>Montant d&eacute;pense</th>
            <th>Date Op&eacute;ration</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>ref-00000</td>
            <td>materieldetransport</td>
            <td>0Ar</td>
            <td>05/06/2022</td>
            <td>
              <div class="action-voyage">
                <a id="" class="btn-sm btn-info editVoyage "><i class="uil-pen"></i></a>
                <a id="" class="btn-sm btn-danger deleteVoyage "><i class="uil-trash-alt"></i></a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>


      </div>
    </div>
  </div>

</div>

</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>