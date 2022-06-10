<%@ include file="../template/head.jsp" %>


<div class="row d-flex justify-content-center align-items-center bg-dark" id="simple-dragula" data-plugin="dragula">
  <div class="col-md-11">
    <div class="card mb-0 mt-3">
      <div class="card-body bg-dark text-light">
        <blockquote class="card-bodyquote mb-0">

          <!-- vente content -->

          <div class="row">
            <h4>Reception article</h4>
            <hr>
            <div class="col-lg-5">
              <div class="mt-3 d-flex justify-content-start">
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="checkMagasin">
                  <label class="form-check-label" for="customCheck1">Magasin</label>
                </div>&nbsp;
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="checkVoyage">
                  <label class="form-check-label" for="customCheck2">Voyage</label>
                </div>
                <br>
              </div>
              <div class="mt-1 mb-1 select-magasin">
                <label for="example-select" class="form-label">Magasin</label>
                <select class="form-select" id="example-select">
                  <option>magasin I</option>
                  <option>magasin II</option>
                </select>
              </div>
              <div class="mt-1 mb-1 select-voyage">
                <label for="example-select" class="form-label">Voyage</label>
                <select class="form-select" id="example-select">
                  <option>Voyage I</option>
                  <option>Voyage II</option>
                </select>
              </div>
              <div class="mb-1">
                <label for="example-select" class="form-label">Facture</label>
                <input type="text" class="form-control">
              </div>
              <br>
              <h4>Ajouter Article</h4>
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
                <label class="form-label">Prix d'Achat - Prix de vente</label>
                <div class="input-group">
                  <input type="number" class="form-control" placeholder="0 Ar" aria-label="Recipient's username">
                  <input type="number" class="form-control" placeholder="0 Ar" aria-label="Recipient's username">

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
                  <th>Facture</th>
                  <th>Article</th>
                  <th>Unite</th>
                  <th>Quantite</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                </tr>
                </thead>
                <tbody>
                <% for (int i = 0; i < 10; i++) { %>
                <tr>
                  <td>ref-000000</td>
                  <td>Nom de l'article</td>
                  <td>Unite de l'article</td>
                  <td>0</td>
                  <td>0Ar</td>
                  <td>0Ar</td>
                </tr>
                <% } %>

                </tbody>
              </table>

              <div class="foot-vente d-none">
                <p>Nombre d'article : <span>00</span></p>
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

<%@ include file="../modal/vente/list-article.jsp" %>
<%@ include file="../modal/vente/list-client.jsp" %>
<%@ include file="../modal/vente/prix-special.jsp" %>

<!-- end modal list -->


<%@ include file="../template/setting.jsp" %>