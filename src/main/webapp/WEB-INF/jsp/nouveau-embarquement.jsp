<%@ include file="template/head.jsp" %>


<div class="row d-flex justify-content-center align-items-center" id="simple-dragula" data-plugin="dragula">
  <div class="col-md-11">
    <div class="card mb-0 mt-3">
      <div class="card-body">
        <blockquote class="card-bodyquote mb-0">

          <!-- vente content -->

          <div class="row">
            <h4>Nouveau Embarquement</h4>
            <hr>
            <div class="col-lg-5">
              <div class="mb-1">
                <label for="example-select" class="form-label">Magasin</label>
                <select class="form-select" id="example-select">
                  <option>1</option>
                </select>
              </div>
              <div class="mb-1">
                <label for="example-select" class="form-label">Chauffeur</label>
                <div class="input-group">
                  <select class="form-select" id="example-select">
                    <option>nomChauffeur</option>
                  </select>
                  <a href="" role="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-chauffeur"><i class="uil-plus"></i></a>
                </div>

              </div>
              <div class="mb-1">
                <label class="form-label">Facture</label>
                <input type="text" class="form-control" placeholder="référence facture">
              </div>

              <hr>

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
                  <label for="inputEmail4" class="form-label">Quantite (Poids : <%= 0 %>T)</label>
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
                <label class="form-label">Prix d'achat</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="0 Ar" aria-label="Recipient's username">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#bs-example-modal-sm"><i class="uil-dollar-alt"></i>&nbsp;Prix special
                  </button>
                </div>
              </div>
              <div class="mb-1">
                <label class="form-label">Prix de vente</label>
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
                  <th>Poids</th>
                </tr>
                </thead>
                <tbody>

                <% for (int i=0;i<5;i++) { %>
                <tr>
                  <td>Nom de l'article</td>
                  <td>Unite de l'article</td>
                  <td>0</td>
                  <td>0Ar</td>
                  <td>0Ar</td>
                </tr>

                <% } %>

                </tbody>
              </table>

              <div class="foot-vente d-flex justify-content-end">
                <p>Nombre d'article : <span>00</span></p>&nbsp;
                <p class="">
                <p>0T</p>
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
<%@ include file="modal/vente/prix-special.jsp" %>
<%@ include file="modal/new-chauffeur.jsp" %>

<!-- end modal list -->


<%@ include file="template/setting.jsp" %>