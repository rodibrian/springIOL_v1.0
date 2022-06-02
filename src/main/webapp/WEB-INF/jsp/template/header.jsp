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
        <a href="index.php" class="logo text-center logo-light">
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
                    <a href="/menu-magasin" class="side-nav-link">
                        <i class="uil-building"></i>
                        <span> Magasin </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="/menu-stock" class="side-nav-link">
                        <i class="uil-archive"></i>
                        <span> Stock </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="/menu-facture" class="side-nav-link">
                        <i class="uil-invoice"></i>
                        <span> Facture </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="/menu-prix" class="side-nav-link">
                        <i class="uil-usd-circle"></i>
                        <span> Prix </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-notes"></i>
                        <span> Embarquement </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-calendar-alt"></i>
                        <span> Peremption </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-user-square"></i>
                        <span> Client </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-store-alt"></i>
                        <span> Fournisseur </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
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
                        <ul class="side-nav-second-level">
                            <li>
                                <a href="apps-ecommerce-products.php">Liste</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-products-details.php">Vente detail</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-orders.php">EntrÃ©e</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-orders-details.php">Sortie</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-customers.php">Transfert</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-shopping-cart.php">Changer de Code</a>
                            </li>
                            <li>
                                <a href="apps-ecommerce-checkout.php">Rectification</a>
                            </li>

                        </ul>
                    </div>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-layers"></i>
                        <span> Livraison </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-money-stack"></i>
                        <span> Caisse </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-money-withdrawal"></i>
                        <span> Paiement </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-calender"></i>
                        <span> Utilisateur </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-users-alt"></i>
                        <span> Choix de magasin </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-lock-access"></i>
                        <span> Autorisation </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-database"></i>
                        <span> Sauvegarder </span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-refresh"></i>
                        <span> Archivage de donnÃ©e</span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-cloud-database-tree"></i>
                        <span> Choix de Base de donnÃ©e</span>
                    </a>
                </li>
                <li class="side-nav-item">
                    <a href="apps-calendar.php" class="side-nav-link">
                        <i class="uil-info-circle"></i>
                        <span> Info sociÃ©tÃ© </span>
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
