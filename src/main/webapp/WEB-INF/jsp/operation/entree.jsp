<%@ include file="../template/head.jsp" %>

<i class="no-title" title="Entree"></i>

<div class="row d-flex justify-content-center align-items-center bg-secondary namespace" id="menu-entree-article"
     data-plugin="dragula">
  <div class="col-md-11">
    <div class="card mt-3 mb-3">
      <div class="card-body bg-light text-dark">
        <blockquote class="card-bodyquote mb-0">

          <!-- vente content -->

          <div class="row">
            <h4>Reception article</h4>
            <hr>

            <div class="col-lg-5">

              <div class="mt-3 d-flex justify-content-start">
                <div class="form-check">
                  <input type="radio" id="check-magasin" name="myradio" class="form-check-input" checked="true">
                  <label class="form-check-label" for="check-magasin">Magasin</label>
                </div>&nbsp;&nbsp;&nbsp;
                <div class="form-check ml-3">
                  <input type="radio" id="check-voyage" name="myradio" class="form-check-input">
                  <label class="form-check-label" for="check-voyage">Voyage</label>
                </div>
              </div>

              <div class="mt-1 mb-1 div-select-magasin">
                <label for="select-magasin" class="form-label">Magasin</label>
                <select class="form-select" id="select-magasin">
                  <c:forEach var="magasin" items="${magasins}">
                    <option value="${magasin.id}"> <c:out value="${magasin.nomMagasin}"/> </option>
                  </c:forEach>
                </select>
              </div>
              <br>

              <div class="mt-1 mb-1 div-select-voyage">
                <label for="select-voyage" class="form-label">Voyage</label>
                <select class="form-select" id="select-voyage">
                </select>
              </div>

              <div class="mb-1 div-select-magasin">
                <label class="form-label">Fournisseur</label>
                    <div class="input-group">
                      <input id="input-nom-fournisseur" type="text" class="form-control" placeholder="Nom du fournisseur"
                             aria-label="Recipient's username">
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-liste-fournisseur" id="btn-search-fournisseur"><i class="uil-search"></i></button><br>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nouveau-fournisseur" id="btn-nouveau-fournisseur"><i class="uil-plus-circle"></i></button>
                    </div>
              </div>
              <div class="mb-1">
                <label for="input-reference-facture" class="form-label">Facture</label>
                <input type="text" class="form-control" id="input-reference-facture">
              </div>

              <br>
              <h4>Ajouter Article</h4>
              <hr>

              <div class="mb-1">
                <label class="form-label">Designation</label>
                <div class="input-group">
                  <input id="input-designation-article" type="text" class="form-control" placeholder="Nom de l'article"
                         aria-label="Recipient's username">
                  <button type="button" id="btn-search-article" class="btn btn-primary" data-bs-toggle="modal"
                          data-bs-target="#modal-liste-article"><i class="uil-search"></i></button>
                </div>
              </div>

              <div class="row g-2">
                <div class="mb-1 col-md-6">
                  <label for="input-quantite-article" class="form-label">Quantite</label>
                  <input type="number" class="form-control" id="input-quantite-article" placeholder="0" value="0">
                </div>
                <div class="mb-1 col-md-6">
                  <label for="select-unite-article" class="form-label">Unite</label>
                  <select class="form-select" id="select-unite-article">
                  </select>
                </div>
              </div>

              <div class="mb-1">
                <label class="form-label">Prix d'Achat (Ar) - Prix de vente (Ar)</label>
                <div class="input-group">
                  <input type="number" id="input-prix-achat-article" class="form-control" placeholder="0 Ar"
                         aria-label="Recipient's username" value="0">
                  <input type="number" id="input-prix-vente-article" class="form-control" placeholder="0 Ar"
                         aria-label="Recipient's username" value="0">

                </div>
              </div>


              <div class="d-grid">
                <button type="button" id="btn-ajouter-article-entree" class="btn btn-success mb-1 mt-3"><i
                        class="uil-plus"></i>&nbsp;Ajouter
                </button>
                <button type="button" id="btn-enregistrer-article-entree" class="btn btn-primary mb-1"><i
                        class="uil-save"></i>Enregistrer
                </button>
              </div>
              <!-- end d-grid -->

            </div>
            <div class="col-lg-7">

              <table id="table-liste-article-entree" class="table table-special-form table-sm table-centered mb-0">
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

                </tbody>
              </table>

              <div class="foot-vente d-none">
                <p>Nombre d'article : <span>00</span></p>
              </div>


              <div class="all-modal">
                <!-- modal list -->
                <%@ include file="../modal/vente/list-article.jsp" %>
                <%@ include file="../modal/fournisseur/list-fournisseur.jsp" %>
                <%@ include file="../modal/fournisseur/new-fournisseur.jsp" %>
                <%@ include file="../modal/vente/prix-special.jsp" %>
                <!-- end modal list -->
              </div>

            </div>
          </div>

          <!-- end vente content -->
        </blockquote>
      </div> <!-- end card-body-->
    </div> <!-- end card-->
  </div> <!-- end col-->

</div>


<%@ include file="../template/setting.jsp" %>