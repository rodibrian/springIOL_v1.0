<%@ page import="java.util.Date" %>
<!-- FACTURE A5 -->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div id="facture-A5" class="container d-flex justify-content-center">

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <meta charset="utf-8"/>

  <div class="col-md-6">
    <div class="invoice">
      <!-- begin invoice-company -->
      <div class="invoice-bordered text-center text-uppercase">"Slogan de la société"</div>
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
              Nif : <strong>000 000 000</strong><br>
              Stat: <strong>0 000 0000 00 0</strong><br>
            </address>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Facture n° : </strong><br>
              <span>Le <%= new Date().toLocaleString()  %></span><br>
              <span>Magasin X</span><br>
              <br>
              Client : <span>Nom du client</span><br>
              Operateur : <span>Nom de l'opérateur</span><br>
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
              <th>Quantite</th>
              <th>Unite</th>
              <th>Designation</th>
              <th>PU</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <% for (int i = 0; i < 5; i++) { %>
            <tr>
              <td>00</td>
              <td>piece</td>
              <td>designation de l'article</td>
              <td>0Ar</td>
              <td>0Ar</td>

            </tr>
            <% } %>
            </tbody>
          </table>
        </div>
        <!-- end table-responsive -->
        <!-- begin invoice-price -->
        <div class="invoice-price">
          <div class="invoice-price-left">
            <div class="invoice-price-row">
              <div class="sub-price">
                <small>SUBTOTAL</small>
                <span class="text-inverse">0Ar</span>
              </div>
              <div class="sub-price">
                <i class="fa fa-plus text-muted"></i>
              </div>
              <div class="sub-price">
                <small>REMISE</small>
                <span class="text-inverse">0Ar</span>
              </div>
            </div>
          </div>
          <div class="invoice-price-right">
            <small>TOTAL</small> <span class="f-w-600">0Ar</span>
          </div>
        </div>
        <!-- end invoice-price -->
      </div>
      <!-- end invoice-content -->
      <!-- begin invoice-note -->
      <div class="invoice-note">
        <span>Arrété à la somme de zero ariary.</span></div>
      <!-- end invoice-note -->
      <!-- begin invoice-footer -->
      <div class="invoice-footer">
       <div class="row">
         <div class="col-4 d-flex justify-content-center text-underline">
           <span>Le Client</span>
         </div>
         <div class="col-4 d-flex justify-content-center text-underline">
           <span>Le Caissier</span>
         </div>
         <div class="col-4 d-flex justify-content-center text-underline">
           <span>Le Magasinier</span>
         </div>
       </div>
      </div>
      <!-- end invoice-footer -->
    </div>
  </div>

</div>