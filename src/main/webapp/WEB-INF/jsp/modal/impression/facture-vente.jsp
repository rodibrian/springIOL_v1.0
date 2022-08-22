<%@ page import="java.util.Date" %>
<!-- FACTURE A5 -->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div id="impression-facture-vente" class="facture-A5 container d-flex justify-content-center index-none">

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <meta charset="utf-8"/>

  <div class="col-md-5 bg-blanc">
    <div class="invoice">
      <!-- begin invoice-company -->
      <div class="invoice-bordered text-center text-uppercase label-solgan-societe">("Slogan de la société")</div>
      <!-- end invoice-company -->
      <!-- begin invoice-header -->
      <div class="invoice-header">
        <div class="row">
          <div class="col-6 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse label-nom-societe">(Nom de la societe)</strong><br>
              <strong class="label-adresse">(Adresse)</strong><br>
              <strong class="label-ville">(Ville)</strong><br>
              Tel : <strong class="label-contact">(+261 00 00 000 00)</strong><br>
              Nif : <strong class="label-nif">(000 000 000)</strong><br>
              Stat: <strong class="label-stat">(0 000 0000 00 0)</strong><br>
            </address>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse">Facture n° : <span class="label-numero-facture">(n°_facture)</span></strong><br>
              <span class="label-date">Le <%= new Date().toLocaleString()  %></span><br>
              Magasin <span class="label-magasin"></span><br>
              <br>
              Client : <span class="label-nom-client">Nom du client</span><br>
              Operateur : <span class="label-nom-operateur">(Nom de l'opérateur)</span><br>
            </address>
          </div>
        </div>
      </div>
      <!-- end invoice-header -->
      <!-- begin invoice-content -->
      <div class="invoice-content">
        <!-- begin table-responsive -->
        <div class="table-responsive">
          <table id="table-liste-ventes" class="table table-invoice">
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
                <span class="text-inverse label-subtotal-vente">0Ar</span>
              </div>
              <div class="sub-price">
                <i class="fa fa-plus text-muted"></i>
              </div>
              <div class="sub-price">
                <small>REMISE</small>
                <span class="text-inverse label-remise-vente">0Ar</span>
              </div>
              <div class="sub-price">
                <small>TOTAL</small>
                <span class="text-inverse label-total-vente">0Ar</span>
              </div>
            </div>
          </div>
        </div>
        <!-- end invoice-price -->
      </div>
      <!-- end invoice-content -->
      <!-- begin invoice-note -->
      <div class="invoice-note">
        <span>Arrété à la somme de <span class="label-somme-en-lettre"></span></span></div>
      <br>
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