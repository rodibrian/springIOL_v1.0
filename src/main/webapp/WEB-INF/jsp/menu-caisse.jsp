<%@ include file='template/head.jsp' %>

<!-- Start Content-->
<div class="container-fluid bg-light text-dark" id="menu-caisse">

  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <div class="input-group">
            <input type="text" class="form-control dropdown-toggle" placeholder="Search..." id="input-search-operation">
            <button id="btn-search-operation" class="input-group-text btn-primary" type="submit"><i class="uil-search"></i></button>
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
        <input type="date" id="input-date-debut" class="form-control">&nbsp;
        <input type="date" id="input-date-fin" class="form-control">&nbsp;
        <select name="select-magasin" id="select-magasin" class="form-select">
        </select>
        <a type="button" id="btn-search-filter" class="btn btn-success mr-1">
          Valider
        </a>
        &nbsp;
        &nbsp;
        </select>
        <a type="button" id="btn-creer-encaissement" class="btn btn-outline-success mr-1" data-bs-toggle="modal"
           data-bs-target="#operation-caisse">
          Encaissement
        </a>
        &nbsp;
        </select>
        <a type="button" id="btn-creer-decaissement" class="btn btn-outline-danger mr-1" data-bs-toggle="modal"
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


      <div class="col-md-2 m-2 type-caisse" id="caisse-facture" value-filter="facture">
        <div class="row">
          <div class="col-md-4 bg-primary d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Factures</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-depense" value-filter="depense">
        <div class="row">
          <div class="col-md-4 bg-warning d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Depenses</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-recette" value-filter="recette">
        <div class="row">
          <div class="col-md-4 bg-success d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Recette</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-consommation" value-filter="consommation">
        <div class="row">
          <div class="col-md-4 bg-primary d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Consommation</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-avoir" value-filter="avoir">
        <div class="row">
          <div class="col-md-4 bg-danger d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Avoir</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-espece" value-filter="espece">
        <div class="row">
          <div class="col-md-4 bg-info d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Especes</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-cheque" value-filter="cheque">
        <div class="row">
          <div class="col-md-4 bg-success d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Cheque</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-credit" value-filter="credit">
        <div class="row">
          <div class="col-md-4 bg-danger d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Credit</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
      <div class="col-md-2 m-2 type-caisse" id="caisse-virement" value-filter="virement">
        <div class="row">
          <div class="col-md-4 bg-warning d-flex justify-content-center align-content-center align-items-center text-center">
            <i class="uil-money-bill uil-size-10"></i>
          </div>
          <div class="col-md-8 p-2 card-caisse bg-secondary text-light">
            <span>Virement</span><br>
            <span class="label-montant">0Ar</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table id="scroll-vertical-datatable"
               class="table-liste-operation-caisse table-special-form table table-sm dt-responsive nowrap table-hover text-dark">
          <thead>
          <tr>
            <th>Operation</th>
            <th>Date</th>
            <th>Reference</th>
            <th>Libelle</th>
            <th>Encaissement</th>
            <th>Decaissement</th>
            <th>Mode de paiement</th>
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

<%@ include file="template/setting.jsp" %>