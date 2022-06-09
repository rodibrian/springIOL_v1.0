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
        <h4 class="page-title">Paiement</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary"><i class="uil-print"></i></a>&nbsp;
          <a href="" class="btn btn-success"><i class="uil-navigator"></i></a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control">&nbsp;
        <input type="date" class="form-control">&nbsp
        <a type="button" class="btn btn-40 btn-success mr-1">
          <i class="uil-filter"></i>
        </a>
      </div>
    </div>
  </div>


  <!-- suite -->

  <div class="container-fluid"><br><br>
    <div class="row">

      <div class="col-lg-12">
        <table id="table-paiement" class="table table-sm dt-responsive nowrap table-hover">
          <thead>
          <tr>
            <th>Reference</th>
            <th>Client</th>
            <th>Operation</th>
            <th>Montant</th>
            <th>Mode de paiement</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td>ref-00000</td>
            <td>nomClient</td>
            <td>designation</td>
            <td>0Ar</td>
            <td>modeDePaiement</td>
            <td>05/06/2022</td>
            <td>aucun description</td>
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