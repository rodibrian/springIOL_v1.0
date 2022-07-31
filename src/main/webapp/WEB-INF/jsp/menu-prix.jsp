<%@ include file='template/header.jsp' %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Start Content-->
<div class="container-fluid">
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Prix</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary d-none"><i class="uil-refresh"></i></a>
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/edit-prix.jsp" %>
  </div>

  <!-- suite -->
  <input type="hidden" id="user-id" value-id="${connectedUser.id}">
  <input type="hidden" id="user-name" value-id="${connectedUser.nom}">
  <div class="container -fluid" id="menu-prix">
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable" class="table-article-prix table table-sm dt-responsive nowrap table-special-form">
          <thead>
          <tr>
            <th>Designation</th>
            <th>Unite</th>
            <th>Prix</th>
            <th>Date mis à jour</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="price" items="${prices}">
            <tr id="${price.filiale.id}-${price.article.id}-${price.unite.id}">
              <td>${price.article.designation}</td>
              <td>${price.unite.designation}</td>
              <td>${price.prixVente}</td>
              <td>${price.dateEnregistrement}</td>
              <td class="d-flex justify-content-center"><a role="button" class="btn btn-sm btn-info info-prix"><i class="uil-pen"></i></a></td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
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
