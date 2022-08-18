<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div class="container-fluid" id="menu-fournisseur">
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
          <a class="btn btn-success btn-export-to-excel bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="export-to-excel"/> </a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-success mr-1 btn-nouveau-fournisseur"><i
                class="uil-plus">&nbsp;</i>Nouveau Fournisseur</a>

      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/fournisseur/new-fournisseur.jsp" %>
    <%@ include file="modal/fournisseur/new-dette.jsp" %>
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
            <th>Dette</th>
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
                  <a  class="btn-sm btn-info editFournisseur"><i class="uil-pen"></i></a>
                  <a  class="btn-sm btn-danger deleteFournisseur"><i class="uil-trash-alt"></i></a>
                </div>
              </td>
            </tr>
          </c:forEach>
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
                  <h4>Information Fournisseur</h4>
                  <hr>
                  <div class="page-title-box">
                    <div class="page-title-right">
                      <a href="" role="button" class="btn btn-success mb-1 bg-forest"><img src="${pageContext.request.contextPath}/assets/images/excel.png" alt="export-to-excel"/>  </a>
                    </div>
                    <div>
                      <a type="button" class="btn btn-outline-secondary mr-1 btn-nouveau-dette" data-bs-target="#nouveau-dette"
                         data-bs-toggle="modal"><i
                              class="uil-file-plus">&nbsp;</i>Nouveau Dette</a>
                      <a type="button" class="btn btn-outline-danger mr-1 btn-supprimer-dette"><i
                              class="uil-trash-alt">&nbsp;</i>Supprimer Dette</a>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <table class="table table-dette-fournisseur table-bordered table-striped table-sm dt-responsive norwap">
                      <thead>
                          <th>Facture</th>
                          <th>Date</th>
                          <th>Credit</th>
                          <th>Payer</th>
                          <th>Reste</th>
                          <th>Description</th>
                      </thead>
                      <tbody>

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