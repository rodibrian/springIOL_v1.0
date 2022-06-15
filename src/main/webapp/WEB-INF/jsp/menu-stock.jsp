<%@ include file='template/header.jsp' %>

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
        <h4 class="page-title">Stock</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-default s-no-value">Toute niveau 1</a>
          <button class="btn btn-info s-no-value btn-stock-valeur"><i class="uil-dollar-alt"></i>Valeur</button>
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <a type="button" class="btn s-no-value btn-40 btn-success mr-1 btn-all-stock" data-bs-toggle="modal"
           data-bs-target="#new-article"><i
                class="uil-table">&nbsp;</i>Toutes</a>
        <a id="btn-article-alert" type="button" class="btn s-no-value btn-40 btn-warning mr-1 btn-alert-stock" data-bs-toggle="modal"
           data-bs-target="#new-article"><i
                class="uil-apps">&nbsp;</i>Alertes</a>
        <h4 class="s-value label-valeur-stock">Montant total : <%= "0Ar" %>
        </h4>
        &nbsp;
        &nbsp;
        <div class="d-inline-flex s-value">
          <div class="mb-3 mr-1">
            <select class="form-select" id="example-select">
              <option>Magasin I</option>
              <option>Magasin II</option>
            </select>
          </div>

        </div>
        <button class="btn s-value btn-40 btn-success mr-1 btn-alert-stock btn-stock-valider"><i
                class="uil-check-square">&nbsp;</i>Valider
        </button>

      </div>
    </div>
  </div>


  <div class="all-modal">
    <%@ include file="modal/info-stock.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable"
               class="table-article-stock table table-special-form table-sm dt-responsive nowrap table-hover table-50">
          <thead>
          <tr>
            <th class="s-no-value">Code</th>
            <th>Designation</th>
            <th>Unite</th>
            <th>Prix</th>
            <th class="s-no-value">Magasin I</th>
            <th class="s-no-value">Magasin II</th>
            <th>Stock G</th>
            <th class="s-no-value">Expd</th>
            <th class="s-value">Montant</th>
          </tr>
          </thead>
          <tbody>
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