<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
          <a href="" class="btn btn-success"><i class="uil-navigator"></i></a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#nouveau-client"><i
                class="uil-plus">&nbsp;</i>Nouveau Client</a>

      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/client/new-client.jsp" %>
    <%@ include file="modal/client/new-credit.jsp" %>
    <%@ include file="modal/client/delete-credit.jsp" %>
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
            <th>Jour echance</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td>nomEtPrenomsClient</td>
            <td>adresseCLient</td>
            <td>+261 00 00 000 00</td>
            <td>0Ar</td>
            <td>0</td>
            <td>
              <div class="action-client">
                <a id="" class="btn-sm btn-info editClient "><i class="uil-pen"></i></a>
                <a id="" class="btn-sm btn-danger deleteClient "><i class="uil-trash-alt"></i></a>
              </div>
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>

        <!-- Collapse facture information -->

        <div class="accordion" id="accordionExample">
          <div class="card mb-0">
            <div id="info-credit" class="collapse"
                 aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body">
                <div class="close w-100 d-flex justify-content-end">
                  <button type="button" class="btn-close-info-credit btn-close pull-right" aria-label="Close"></button>
                </div>
                <div class="row" id="tab-article">
                  <h4>Information CLient</h4>
                  <hr>
                  <div class="page-title-box">
                    <div class="page-title-right">
                      <a href="" role="button" class="btn btn-success mb-1"><i class="uil-navigator"></i> </a>
                    </div>
                    <div>
                      <a type="button" class="btn btn-outline-secondary mr-1" data-bs-target="#nouveau-credit"
                         data-bs-toggle="modal"><i
                              class="uil-file-plus">&nbsp;</i>Nouveau Credit</a>
                      <a type="button" class="btn btn-outline-danger mr-1" data-bs-target="#delete-credit"
                         data-bs-toggle="modal"><i
                              class="uil-trash-alt">&nbsp;</i>Supprimer Credit</a>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <table class="table table-bordered table-striped table-sm dt-responsive norwap">
                      <thead>
                      <th>Facture</th>
                      <th>Date</th>
                      <th>Credit</th>
                      <th>Payer</th>
                      <th>Reste</th>
                      <th>Description</th>
                      </thead>
                      <tbody>
                      <% for (int i = 0; i < 5; i++) { %>
                      <tr>
                        <td>ref-000000000</td>
                        <td>05/06/22</td>
                        <td>0Ar</td>
                        <td>0Ar</td>
                        <td>0Ar</td>
                        <td>Aucun description</td>
                      </tr>
                      <% } %>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- End collapse facture information -->

      </div>
    </div>
  </div>

</div>

</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>