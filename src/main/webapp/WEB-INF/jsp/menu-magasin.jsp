<%@ include file='template/header.jsp' %>

<!-- Start Content-->
<div class="container-fluid">

    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Magasin</h4>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row mr-2">
        <div class="col-12">
            <div class="d-block mt-1">
                <a type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#new-magasin"><i
                        class="uil-file-plus">&nbsp;</i>Nouveau Magasin</a>
            </div>
        </div>
    </div>


    <div class="all-modal">
        <%@ include file="modal/new-magasin.jsp" %>
    </div>

    <!-- suite -->


    <div class="container -fluid"><br><br>
        <div class="row">
            <div class="col-lg-4">
                <table class="table table-sm table-hover">
                    <thead>
                    <tr>
                        <th>Nom du magasin</th>
                        <th>Adresse</th>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Magasin I</th>
                        <th>Adresse I</th>
                    </tr>

                    <tr>
                        <th>Magasin II</th>
                        <th>Adresse II</th>
                    </tr>
                    <tr>
                        <td>
                            <div class="d-flex justify-content-center mb-3">&nbsp;
                                <a href="" class="btn btn-primary" type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#new-magasin"><i class="uil-pen"></i></a>&nbsp;
                                <a href="" class="btn btn-danger"><i class="uil-trash-alt"></i></a>
                            </div>
                        </td>
                        <td>&nbsp</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-8">
                <h4 class="text-decoration-underline text-uppercase">Listes des utilisateurs du magasin</h4>
            <table id="scroll-vertical-datatable" class="table table-sm dt-responsive nowrap table-hover">
                <thead>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Fonction</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>nomdutilisateur</td>
                    <td>fonction de l'utilisateur</td>
                </tr>
                <tr>
                    <td>nomdutilisateur</td>
                    <td>fonction de l'utilisateur</td>
                </tr>
                <tr>
                    <td>nomdutilisateur</td>
                    <td>fonction de l'utilisateur</td>
                </tr>
                </tbody>
        </div>
    </div>
</div>


</div>

</div> <!-- container -->

</div> <!-- content -->
</div>

</div>

</div>
</div>

</div>
</div>

<!-- ============================================================== -->
<!-- End Page content -->
<!-- ============================================================== -->

<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>