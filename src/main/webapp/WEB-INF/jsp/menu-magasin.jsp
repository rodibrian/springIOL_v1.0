<%@ include file='template/header.jsp' %>
<!-- Start Content-->
<div class="container-fluid" id="menu-magasin">
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Magasin</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="d-block mt-1">
        <a id="btn-nouveau-magasin" type="button" class="btn btn-success mr-1" data-bs-toggle="modal"
           data-bs-target="#new-magasin"><i
                class="uil-file-plus">&nbsp;</i>Nouveau Magasin</a>
      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/new-magasin.jsp" %>
  </div>
  <!-- suite -->
  <div class="all-modal"></div>
  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-4">
        <table id="table-liste-magasin" class="table table-sm table-hover">
          <thead>
          <tr>
            <th>Nom du magasin</th>
            <th>Adresse</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            <c:forEach var="magasin" items="${magasins}">
              <tr id="${magasin.id}">
                <td><c:out value="${magasin.nomMagasin}"/></td>
                <td><c:out value="${magasin.adresse}"/></td>
                <td>
                  <div class="d-inline-flex justify-content-center">
                    <a href="#" class="delete-magasin">
                      <i class="uil-trash-alt"></i>
                      </a><a href="#" class="edit-magasin">
                      <i class="uil-pen">
                      </i>
                    </a>
                  </div>
                </td>
              </tr>
            </c:forEach>
          </tbody>
        </table>
      </div>
      <div class="col-lg-8">
        <h4 class="text-decoration-underline text-uppercase">Listes des utilisateurs du magasin</h4>
        <table id="table-liste-utilisateur-magasin" class="table table-special-form table-sm dt-responsive nowrap">
          <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Fonction</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
      </div>
    </div>
  </div>

</div>

</div> <!-- container -->

</div> <!-- content -->
</div>

</div>

</div>
</div>

</div>
</div>

<!-- ============================================================== -->
<!-- End Page content -->
<!-- ============================================================== -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>