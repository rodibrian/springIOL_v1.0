<%@ include file='template/header.jsp' %>

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


  <div class="container -fluid">
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable"
               class="table-prix table table-sm dt-responsive nowrap table-hover table-striped">
          <thead>
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Unite</th>
            <th>Prix</th>
            <th>Date mis à jour</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 10; i++) { %>
          <tr>
            <th>000 000 000 00</th>
            <td>Designation d'article</td>
            <td>unite</td>
            <td>0Ar</td>
            <td>05/06/2022</td>
          </tr>
          <% } %>
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