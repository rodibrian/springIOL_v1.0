<%@ include file='template/head.jsp' %>

<!-- Start Content-->
<div class="container-fluid bg-dark text-light">

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
        <h4 class="page-title">Caisse</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-inline-flex mt-1">
        <input type="date" class="form-control">&nbsp;
        <input type="date" class="form-control">&nbsp;
        <select name="" id="" class="form-select">
          <option value="">Magasin I</option>
          <option value="">Magasin II</option>
        </select>
        <a type="button" class="btn btn-success mr-1">
          Valider
        </a>
        &nbsp;
        &nbsp;
        </select>
        <a type="button" id="btnEncaissement" class="btn btn-outline-success mr-1" data-bs-toggle="modal"
           data-bs-target="#operation-caisse">
          Encaissement
        </a>
        &nbsp;
        </select>
        <a type="button" id="btnDecaissement" class="btn btn-outline-danger mr-1" data-bs-toggle="modal"
           data-bs-target="#operation-caisse">
          Decaissement
        </a>
      </div>
    </div>
  </div>

  <div class="all-modal">
    <%@ include file="modal/new-operation-caisse.jsp" %>
  </div>

  <!-- suite -->


  <div class="container-fluid mt-3">
    <div class="row">


      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-primary d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Factures</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-warning d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Depenses</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-success d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Recette</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-primary d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Consommation</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-danger d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Avoir</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-info d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Especes</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-success d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Cheque</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-danger d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Credit</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2">
        <div class="row">
          <div class="col-md-4 bg-warning d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Virement</span><br>
            <span>0Ar</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable"
               class="table-peremption table table-sm dt-responsive nowrap table-hover text-light">
          <thead>
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Unite</th>
            <th>Quantite</th>
            <th>Date de peremption</th>
            <th>Etat</th>
          </tr>
          </thead>
          <tbody>
          <% for (int i = 0; i < 10; i++) { %>
          <tr>
            <th>000 000 000 00</th>
            <td>Designation d'article</td>
            <td>unite</td>
            <td>0</td>
            <td>05/06/2022</td>
            <td><span class="badge badge-danger-lighten">p&eacute;rim&eacute;</span></td>
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

<%@ include file="template/setting.jsp" %>