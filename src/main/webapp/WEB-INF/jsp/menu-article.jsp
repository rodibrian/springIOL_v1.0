<%@ include file="template/header.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Start Content-->
<div class="container-fluid">
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <div class="input-group">
                        <input type="text" class="form-control dropdown-toggle" placeholder="Search..." id="top-search">
                        <button class="input-group-text btn-primary" type="submit"><i class="uil-search"></i></button>
                    </div>
                </div>
                <h4 class="page-title">Article</h4>
            </div>
        </div>
    </div>
    <!-- end page title -->

    <div class="row mr-2">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <a href="" class="btn btn-info"><i class="uil-pen"></i></a>
                    <a href="" class="btn btn-danger"><i class="uil-trash-alt"></i></a>
                    <a href="" class="btn btn-warning"><i class="uil-eye-slash"></i></a>
                    <a href="" class="btn btn-success"><i class="uil-navigator"></i>&nbsp;</a>
                </div>
            </div>
            <div class="d-block mt-1">
                <a type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#new-article"><i
                        class="uil-file-plus">&nbsp;</i>Nouveau Article</a>

            </div>
        </div>
    </div>


    <div class="all-modal">
        <%@ include file="modal/new-article.jsp" %>
        <%@ include file="modal/new-categorie.jsp" %>
    </div>

    <!-- suite -->


    <div class="container -fluid"><br><br>
        <div class="row">
            <div class="col-lg-2">
                <table id="categorieTabList" class="table table-sm table-hover">
                    <thead>
                    <th>Listes des categories</th>
                    </thead>
                    <tbody>
                        <c:forEach var="categorie" items="${categories}">
                            <tr id="${categorie.id}" >
                                <td><c:out value="${categorie.libelle}"/></td>
                            </tr>
                        </c:forEach>
                    <tr>
                        <th>
                            <div class="d-flex justify-content-center mb-3">
                                <a href="" class="btn btn-success" data-bs-toggle="modal"
                                   data-bs-target="#standard-modal2"><i class="uil-plus"></i></a>&nbsp;
                                <a href="" class="btn btn-primary"><i class="uil-pen"></i></a>&nbsp;
                                <a href="" class="btn btn-danger"><i class="uil-trash-alt"></i></a>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-10">
            <table id="scroll-vertical-datatable" class="table table-sm dt-responsive nowrap table-hover">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Designation</th>
                    <th>Unite</th>
                    <th>Quantit�</th>
                    <th>Poids</th>
                    <th>Categorie</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>000 000 000 00</td>
                    <td>Designation d'article</td>
                    <td>unit�</td>
                    <td>00</td>
                    <td>00Kg</td>
                    <td>categorie</td>
                </tr>
                <tr>
                    <td>000 000 000 00</td>
                    <td>Designation d'article</td>
                    <td>unit�</td>
                    <td>00</td>
                    <td>00Kg</td>
                    <td>categorie</td>
                </tr>
                <tr>
                    <td>000 000 000 00</td>
                    <td>Designation d'article</td>
                    <td>unite</td>
                    <td>00</td>
                    <td>00Kg</td>
                    <td>categorie</td>
                </tr>
                <tr>
                    <td>000 000 000 00</td>
                    <td>Designation d'article</td>
                    <td>unite</td>
                    <td>00</td>
                    <td>00Kg</td>
                    <td>categorie</td>
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