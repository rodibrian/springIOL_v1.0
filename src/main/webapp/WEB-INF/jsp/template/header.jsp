<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<%@ include file="head.jsp" %>
<body class="loading"
      data-layout-config='{"leftSideBarTheme":"dark","layoutBoxed":false, "leftSidebarCondensed":false, "leftSidebarScrollable":false,"darkMode":true, "showRightSidebarOnStart": true}'>
<!-- Begin page -->
<div class="wrapper">
  <!-- ========== Left Sidebar Start ========== -->
  <div class="leftside-menu">

    <!-- LOGO -->
    <a href="/dashboard" class="logo text-center logo-light">
                    <span class="logo-lg">
                        <img src="../images/logo.png" alt="" height="16">&nbsp; I-jeery OnLine v1.0
                    </span>
      <span class="logo-sm">
                        <img src="../images/logo.png" alt="" height="16">
                    </span>
    </a>

    <!-- LOGO -->
    <a href="index.php" class="logo text-center logo-dark">
                    <span class="logo-lg">
                        <img src="../images/logo-dark.png" alt="" height="16">
                    </span>
      <span class="logo-sm">
                        <img src="../images/logo_sm_dark.png" alt="" height="16">
                    </span>
    </a>

    <div class="h-100" id="leftside-menu-container" data-simplebar="">

      <!--- Sidemenu -->
      <ul class="side-nav">


        <li class="side-nav-title side-nav-item">Menu de Navigation</li>
        <li class="side-nav-item">
          <a href="/dashboard" class="side-nav-link">
            <i class="uil-dashboard"></i>
            <span> Tableau de bord </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/articles" class="side-nav-link">
            <i class="uil-box"></i>
            <span> Article </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/ventes" class="side-nav-link"
             target="_blank">
            <i class="uil-shopping-cart-alt"></i>
            <span> Vente </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/detail-ventes" class="side-nav-link">
            <i class="uil-calender"></i>
            <span> Detail de vente </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/magasin" class="side-nav-link">
            <i class="uil-building"></i>
            <span> Magasin </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/stock" class="side-nav-link">
            <i class="uil-archive"></i>
            <span> Stock </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/facture" class="side-nav-link">
            <i class="uil-invoice"></i>
            <span> Facture </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/prix" class="side-nav-link">
            <i class="uil-usd-circle"></i>
            <span> Prix </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/embarquement" class="side-nav-link">
            <i class="uil-notes"></i>
            <span> Embarquement </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/peremption" class="side-nav-link">
            <i class="uil-calendar-alt"></i>
            <span> Peremption </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/client" class="side-nav-link">
            <i class="uil-user-square"></i>
            <span> Client </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/fournisseur" class="side-nav-link">
            <i class="uil-store-alt"></i>
            <span> Fournisseur </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/voyage" class="side-nav-link">
            <i class="uil-ship"></i>
            <span> Voyage </span>
          </a>
        </li>

        <li class="side-nav-item">
          <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false"
             aria-controls="sidebarEcommerce" class="side-nav-link">
            <i class="uil-th"></i>
            <span> Operation </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarEcommerce">
            <ul class="side-nav-second-level nav-operation">
              <li>
                <a href="operation/liste">Liste</a>
              </li>
              <li>
                <a href="operation/entree" target="_blank">Entr&eacute;e</a>
              </li>
              <li>
                <a href="operation/sortie" target="_blank">Sortie</a>
              </li>
              <li>
                <a href="operation/transfert" target="_blank">Transfert</a>
              </li>
              <li class="d-none">
                <a href="operation/changer-de-code">Changer de Code</a>
              </li>
              <li class="d-none">
                <a href="operation/rectification">Rectification</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="side-nav-item">
          <a href="/livraison" class="side-nav-link">
            <i class="uil-layers"></i>
            <span> Livraison </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/caisse" class="side-nav-link" target="_blank">
            <i class="uil-money-stack"></i>
            <span> Caisse </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/paiement" class="side-nav-link">
            <i class="uil-money-withdrawal"></i>
            <span> Paiement </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/utilisateur" class="side-nav-link">
            <i class="uil-users-alt"></i>
            <span> Utilisateur </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a class="side-nav-link" role="button" data-bs-toggle="modal" data-bs-target="#choix-magasin">
            <i class="uil-building"></i>
            <span> Choix de magasin </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/autorisation" class="side-nav-link">
            <i class="uil-lock-access"></i>
            <span> Autorisation </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a class="side-nav-link" role="button" data-bs-toggle="modal" data-bs-target="#sauvegarde">
            <i class="uil-database"></i>
            <span> Sauvegarder </span>
          </a>
        </li>
        <li class="side-nav-item">
          <a href="/archivage" class="side-nav-link">
            <i class="uil-refresh"></i>
            <span> Archivage de donnÃ©e</span>
          </a>
        </li>
        <li class="side-nav-item">
          <a class="side-nav-link" role="button" data-bs-toggle="modal" data-bs-target="#choix-de-bdd">
            <i class="uil-cloud-database-tree"></i>
            <span> Choix de Base de données</span>
          </a>
        </li>
        <li class="side-nav-item">
          <a class="side-nav-link" role="button" data-bs-toggle="modal" data-bs-target="#info-filiale">
            <i class="uil-info-circle"></i>
            <span> Info société </span>
          </a>
        </li>

      </ul>

      <!-- End Sidebar -->

      <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

  </div>
  <!-- Left Sidebar End -->

  <!-- ============================================================== -->
  <!-- Start Page Content here -->
  <!-- ============================================================== -->

  <div class="content-page">


    <%@ include file="topbar.jsp" %>


    <!-- inclusion des modals -->
    <%@ include file="../modal/menu-choix-magasin.jsp" %>
    <%@ include file="../modal/menu-choix-de-bdd.jsp" %>
    <%@ include file="../modal/menu-sauvegarde.jsp" %>

    <!-- fin d'inclusion des modals -->

    <!-- Start Content-->


    <!-- Modal list  -->

    <!-- End Modal list -->

    <div class="container-fluid">

      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <br>
        </div>
      </div>
      <!-- end page title -->
