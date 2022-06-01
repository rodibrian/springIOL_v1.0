<%@ include file="template/head.jsp" %>


<div class="row d-flex justify-content-center align-items-center" id="simple-dragula" data-plugin="dragula">
  <div class="col-md-11">
    <div class="card mb-0 mt-3">
      <div class="card-body">
        <blockquote class="card-bodyquote mb-0">

          <!-- vente content -->

          <div class="row">
            <h4>Vente</h4>
            <hr>
            <div class="col-lg-5">
              <div class="mb-1">
                <label for="example-select" class="form-label">Magasin</label>
                <select class="form-select" id="example-select">
                  <option>1</option>
                </select>
              </div>
              <div class="mb-1">
                <label class="form-label">Client</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Nom du client" aria-label="Recipient's username">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#bs-example-modal-lg2"><i class="uil-search"></i></button>
                </div>
              </div>

              <hr>

              <div class="mt-1 d-inline-flex d-none">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="customCheck1">
                  <label class="form-check-label" for="customCheck1">Bon</label>
                </div>&nbsp;&nbsp;&nbsp;
                <div class="form-check ml-1">
                  <input type="checkbox" class="form-check-input" id="customCheck2">
                  <label class="form-check-label" for="customCheck2">A livrer</label>
                </div>
              </div>

              <div class="mb-1">
                <label class="form-label">Designation</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Nom de l'article"
                         aria-label="Recipient's username">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#bs-example-modal-lg"><i class="uil-search"></i></button>
                </div>
              </div>

              <div class="row g-2">
                <div class="mb-1 col-md-6">
                  <label for="inputEmail4" class="form-label">Quantite</label>
                  <input type="number" class="form-control" id="inputEmail4" placeholder="00">
                </div>
                <div class="mb-1 col-md-6">
                  <label for="example-select" class="form-label">Unite</label>
                  <select class="form-select" id="example-select">
                    <option>1</option>
                  </select>
                </div>
              </div>

              <div class="mb-1">
                <label class="form-label">Prix Unitaire</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="0 Ar" aria-label="Recipient's username">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#bs-example-modal-sm"><i class="uil-dollar-alt"></i>&nbsp;Prix special
                  </button>
                </div>
              </div>

              <div class="d-grid">
                <button type="button" class="btn btn-success mb-1 mt-3"><i class="uil-plus"></i>&nbsp;Ajouter</button>
                <button type="button" class="btn btn-primary mb-1"><i class="uil-save"></i>Enregistrer</button>
              </div>
              <!-- end d-grid -->

            </div>
            <div class="col-lg-7">

              <table class="table table-sm table-centered mb-0">
                <thead>
                <tr>
                  <th>Article</th>
                  <th>Unite</th>
                  <th>Quantite</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Nom de l'article</td>
                  <td>Unite de l'article</td>
                  <td>0</td>
                  <td>0Ar</td>
                  <td>0Ar</td>
                </tr>
                <tr>
                  <td>Nom de l'article</td>
                  <td>Unite de l'article</td>
                  <td>0</td>
                  <td>0Ar</td>
                  <td>0Ar</td>
                </tr>
                <tr>
                  <td>Nom de l'article</td>
                  <td>Unite de l'article</td>
                  <td>0</td>
                  <td>0Ar</td>
                  <td>0Ar</td>
                </tr>
                </tbody>
              </table>

              <div class="foot-vente d-none">
                <p>Nombre d'article : <span>00</span></p>

                <p class="">
                <p>0Ar</p>
                <p>0Fmg</p>
                </p>
              </div>

            </div>
          </div>

          <!-- end vente content -->
        </blockquote>
      </div> <!-- end card-body-->
    </div> <!-- end card-->
  </div> <!-- end col-->
</div>


<!-- modal list -->

<%@ include file="modal/vente/list-article.jsp" %>
<%@ include file="modal/vente/list-client.jsp" %>
<%@ include file="modal/vente/prix-special.jsp" %>

<!-- end modal list -->


<%@ include file="template/setting.jsp" %>