<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <h4 class="page-title">Facture</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-info"><i class="uil-refresh"></i></a>
          <a href="" class="btn btn-warning"><i class="uil-money-insert"></i></a>
          <a href="" class="btn btn-warning d-none"><i class="uil-meh-closed-eye"></i></a>
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control btn-40">&nbsp;&agrave;&nbsp;
        <input type="date" class="form-control btn-40">&nbsp;
        <select name="magasin" id="" class="form-control btn-40">
          <option value="0">Magasin I</option>
          <option value="0">Magasin II</option>
        </select>&nbsp;
        <h4 class="d-none">Nombre : <%= "00" %>
        </h4>
      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/info-facture.jsp" %>
  </div>

  <!-- suite -->


  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable" class="table-facture table table-sm dt-responsive nowrap table-hover table-striped">
          <thead>
          <tr>
            <!-- button déclenchement click -->
            <a id="btn-info-facture" type="button" class="btn btn-success mr-1 d-none" data-bs-toggle="modal" data-bs-target="#info-facture"><i
                    class="uil-info-circle">&nbsp;</i></a>
            <th>Réference</th>
            <th>Client</th>
            <th>Article</th>
            <th>Unite</th>
            <th>Quantite</th>
            <th>Prix Unitaire</th>
            <th>Montant</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 10; i++) { %>
          <tr>
            <td>Ref 000 000 000 00</td>
            <td>Nom du Client</td>
            <td>Designation d'article</td>
            <td>unite</td>
            <td>00</td>
            <td>0Ar</td>
            <td>0Ar</td>
            <td>05/06/2022</td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row" id="tab-article">
      <div class="col-md-6">
        <table class="table table-striped table-sm dt-responsive norwap">
          <thead>
          <th>Designation</th>
          <th>Unite</th>
          <th>Prix Unitaire</th>
          <th>Montant</th>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) { %>
          <tr>
            <td>Nomdelarticle</td>
            <td>unite</td>
            <td>0Ar</td>
            <td>0Ar</td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h4>Facture numero : <%= "Ref 00000" %>
        </h4><br>
        <h4>Epece : <%= "0Ar" %>
        </h4><br>
        <h4>Autres : <%= "0Ar" %>
        </h4><br><br>
        <button class="btn btn-danger btn-lg">Avoir</button>
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