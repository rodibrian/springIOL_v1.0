<%@ page import="java.util.Date" %>
<!-- FACTURE A5 -->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div id="" class="container d-flex justify-content-center a4-paysage">

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <meta charset="utf-8"/>

  <div class="col-md-8 bg-blanc">
    <div class="invoice">
      <!-- begin invoice-header -->
      <div class="invoice-header">
        <div class="row">
          <div class="col-4 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Nom de la societe</strong><br>

            </address>
          </div>
          <div class="col-8 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Bon de transfert</strong><br>
              <span>BT n°: XXXXX</span><br>
              <span>Le <%= new Date().toLocaleString()  %></span><br>
              <span>Magasin de sortie : X</span><br>
              <span>Magasin d'entrée : X</span><br>
              <span>Reference : XXXXXX</span><br>
              <span>Opérateur : username</span>
            </address>
          </div>
        </div>
      </div>
      <!-- end invoice-header -->
      <!-- begin invoice-content -->
      <div class="invoice-content">
        <!-- begin table-responsive -->
        <div class="table-responsive">
          <table class="table table-invoice">
            <thead>
            <tr class="bg-dark">
              <th>Code</th>
              <th>Designation</th>

              <th>Unite</th>
              <th>Quantite</th>
              <th>Observation</th>
            </tr>
            </thead>
            <tbody>
            <% for (int i = 0; i < 5; i++) { %>
            <tr>
              <td>X</td>
              <td>designation de l'article</td>
              <td>piece</td>
              <td>0</td>
              <td>Aucun description</td>

            </tr>
            <% } %>
            </tbody>
          </table>
        </div>
        <!-- end table-responsive -->

      </div>
      <!-- end invoice-content -->

      <!-- begin invoice-footer -->
      <div class="invoice-footer">
       <div class="row">
         <div class="col-6 d-flex justify-content-center text-underline">
           <span>Heure d'entrée</span>
         </div>
         <div class="col-6 d-flex justify-content-center text-underline">
           <span>Responsable d'entrée</span>
         </div>
       </div>
      </div>
      <!-- end invoice-footer -->
    </div>
  </div>

</div>