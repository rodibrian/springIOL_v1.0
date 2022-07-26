<%@ page import="java.util.Date" %>
<!-- FACTURE A5 -->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div id="impression-bon-entree-ou-sortie" class="container d-flex justify-content-center a4-paysage">

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <meta charset="utf-8"/>

  <div class="col-md-8 bg-blanc">
    <div class="invoice">
      <!-- begin invoice-header -->
      <div class="invoice-header">
        <div class="row">
          <div class="col-4 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse label-nom-societe">(Nom de la societe)</strong><br>

            </address>
          </div>
          <div class="col-8 d-flex justify-content-center">
            <address class="m-t-5 m-b-5">
              <strong class="text-inverse label-bon-entree-ou-sortie">Bon d'entrée/sortie</strong><br>
              <span>BE n°: <span class="label-numero-bon">(XXXXX)</span></span><br>
              <span class="label-date-bon">Le <%= new Date().toLocaleString()  %></span><br>
              Magasin : <span class="label-magasin"></span><br>
              <span>Reference : <span class="label-referene">(XXXXX)</span></span><br>
              <span>Opérateur : <span class="label-utilisateur">(username)</span></span>
            </address>
          </div>
        </div>
      </div>
      <!-- end invoice-header -->
      <!-- begin invoice-content -->
      <div class="invoice-content">
        <!-- begin table-responsive -->
        <div class="table-responsive">
          <table id="liste-article-bon" class="table table-invoice">
            <thead>
            <tr class="bg-dark">
              <th class="no-sortie">Facture</th>
              <th>Designation</th>
              <th>Unite</th>
              <th>Quantite</th>
              <th class="no-sortie">Prix Unitaire</th>
              <th class="no-sortie">Montant</th>
              <th class="no-entree">Description</th>
            </tr>
            </thead>
            <tbody>
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