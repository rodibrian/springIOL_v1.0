<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
<!-- Start Content-->
<div class="container-fluid">
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box">

        <h4 class="page-title">Autorisation</h4>
      </div>
    </div>
  </div>
  <!-- end page title -->
  <div class="row mr-2">
    <div class="col-12">
      <div class="page-title-box">
        <div class="page-title-right">
          <a href="" class="btn btn-primary"><i class="uil-refresh"></i>&nbsp;</a>
        </div>
      </div>
      <div class="d-block mt-1">
        <a type="button" class="btn btn-primary mr-1" href="" data-bs-toggle="modal"
           data-bs-target="#nouvelle-fonction-autorisation"><i
                class="uil-plus">&nbsp;</i>Nouvelle Fonction</a>
      </div>
    </div>
  </div>

  <!-- suite -->

  <div class="container -fluid"><br><br>
    <div class="row">
      <div class="col-lg-2">
        <table id="voyageTabList" class="table table-sm table-hover">
          <thead>
          <th>Listes des fonctions</th>
          </thead>
          <tbody>
          <% for (int i = 0; i < 5; i++) {%>
          <tr id="">
            <td>Admin 0<%= i %>
            </td>
            <td>
              <div style="display: flex;align-content: center;">
                <a id="" data-bs-toggle="modal" data-bs-target="#standard-modal2" href="#" class="editFonction"><i
                        class="uil-pen"></i></a>
                <a id="" href="#" class="deleteFonction"><i class="uil-trash-alt"></i></a>
              </div>&nbsp;
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
      <div class="col-lg-10">
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a href="#auto-acceuil" data-bs-toggle="tab" aria-expanded="true" class="nav-link active">
              <i class="mdi mdi-home-variant d-md-none d-block"></i>
              <span class="d-none d-md-block">Page d'acceuil</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-menu" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-account-circle d-md-none d-block"></i>
              <span class="d-none d-md-block">Menu</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-creation" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Creation</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-modification" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Modification</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-option" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Option</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-impression" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Impression</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#auto-notification" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Notification</span>
            </a>
          </li>
          <li class="nav-item d-none">
            <a href="#auto-imprimante" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Imprimante</span>
            </a>
          </li>

          <li class="nav-item d-none">
            <a href="#auto-imprimante" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
              <i class="mdi mdi-settings-outline d-md-none d-block"></i>
              <span class="d-none d-md-block">Magasin</span>
            </a>
          </li>

        </ul>

        <div class="tab-content">
          <div class="tab-pane show active" id="auto-acceuil">
            <div class="content m-1 col-6">
              <label for="page">Definir votre page d'acceuil</label>
              <select required name="page" id="page" class="form-select">
                <option value="">page I</option>
                <option value="">page II</option>
                <option value="">page III</option>
              </select>
            </div>
          </div>
          <div class="tab-pane" id="auto-menu">
            <table class="list-menu table table-hover">
              <tbody>
              <% for (int i = 0; i < 5; i++) { %>
              <tr class="p-0">
                <td class="p-1">Menu I</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="auto-creation">
            <table class="tab-creation table table-hover">
              <tbody>
              <% for (int i = 0; i < 5; i++) { %>
              <tr class="p-0">
                <td class="p-1">Option creation I</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="auto-modification">
            <table class="tab-modification table table-hover">
              <tbody>
              <% for (int i = 0; i < 5; i++) { %>
              <tr class="p-0">
                <td class="p-1">Option modification I</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="auto-option">
            <table class="tab-option table table-hover">
              <tbody>
              <% for (int i = 0; i < 5; i++) { %>
              <tr class="p-0">
                <td class="p-1">Option autoris&eacute; I</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <% } %>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="auto-impression">
            <table class="tab-impression table table-hover">
              <tbody>

              <tr class="p-0">
                <td class="p-1">Facture (duplicata)</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <tr class="p-0">
                <td class="p-1">Livraison (duplicata)</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-danger">Desactiver</button>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="auto-notification">
            <table class="tab-notification table table-hover">
              <tbody>

              <tr class="p-0">
                <td class="p-1">Facture</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-success">Activer</button>
                </td>
              </tr>
              <tr class="p-0">
                <td class="p-1">Livraison</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-danger">Desactiver</button>
                </td>
              </tr>
              <tr class="p-0">
                <td class="p-1">Commande</td>
                <td class="p-1 d-flex justify-content-end">
                  <button class="btn btn-danger">Desactiver</button>
                </td>
              </tr>

              </tbody>
            </table>

          </div>
          <div class="tab-pane" id="auto-imprimante">
            <p>Gerer par le navigateur</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>


<!-- inclusion of modal -->

<div class="all-modal">
  <%@ include file="modal/new-fonction-autorisation.jsp" %>
</div>

</div> <!-- container -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>