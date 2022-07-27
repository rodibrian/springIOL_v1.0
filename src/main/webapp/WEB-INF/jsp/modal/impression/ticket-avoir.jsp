<%@ page import="java.util.Date" %>
<!-- FACTURE A5 -->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div id="facture-A5" class="d-flex justify-content-center">

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <meta charset="utf-8"/>

  <div class="col-md-2">
    <div class="invoice invoice-sm">
      <!-- begin invoice-company -->
      <div class="text-end text-uppercase"><span class="invoice-bordered p-1 bg-dragula">AVOIR</span></div>
      <!-- end invoice-company -->
      <!-- begin invoice-header -->
      <div class="invoice-header">
        <div class="row">
          <div class="col-6 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Nom de la societe</strong><br>
              <strong>Adresse</strong><br>
              <strong>Ville</strong><br>
              Tel : <strong>+261 00 00 000 00</strong><br>
              Client : <span>Nom du client</span><br>
            </address>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Avoir n° : </strong><br>
              <span>Le <%= new Date().toLocaleString()  %></span><br>
              <span>Magasin X</span><br><br>

              <span>Op : Nom de l'opérateur</span>
            </address>
          </div>
        </div>
      </div>
      <!-- end invoice-header -->
      <!-- begin invoice-content -->
      <div class="invoice-content">
        <!-- begin table-responsive -->
        <div class="table-responsive">
          <table class="table table-invoice mb-0">
            <thead>
            <tr class="bg-dark">
              <th>Article</th>
              <th>T.Prix</th>
            </tr>
            </thead>
            <tbody>
            <% for (int i = 0; i < 5; i++) { %>
            <tr>
              <td>Designation de l'article</td>
              <td>0Ar</td>

            </tr>
            <% } %>
            </tbody>
          </table>
        </div>
        <!-- end table-responsive -->
        <!-- begin invoice-price -->
        <div class="invoice-price">
          <div class="invoice-price-right">
            <span class="f-w-600">Montant total : 0Ar</span>
          </div>
        </div>
        <!-- end invoice-price -->
      </div>
      <!-- end invoice-content -->
      <!-- begin invoice-note -->
      <div class="invoice-note">
        <span>Edition du <%= new Date().toLocaleString() %></span></div>
      <!-- end invoice-note -->
      <!-- begin invoice-footer -->
      <div class="invoice-footer">
        <div class="row">
          <div class="col-12 d-flex justify-content-center text-underline">
            <span>Meric de votre visite, a bientôt!</span>
          </div>
        </div>
        <!-- end invoice-footer -->
      </div>
    </div>

  </div>

</div>