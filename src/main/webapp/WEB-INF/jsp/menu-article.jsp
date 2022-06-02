<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="template/header.jsp" %>
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
                <a id="newArticleBtn" type="button" class="btn btn-success mr-1" data-bs-toggle="modal" data-bs-target="#new-article"><i
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
                        <tr>
                            <td>Toutes</td>
                        </tr>
                        <c:forEach var="categorie" items="${categories}">
                            <tr id="${categorie.id}">
                                <td><c:out value="${categorie.libelle}"/></td>
                                <td>
                                    <div style="display: flex;align-content: center;">
                                        <a id="${categorie.id}" data-bs-toggle="modal" data-bs-target="#standard-modal2" href="#" class="editCategorie"><i class="uil-pen"></i></a>
                                        <a id="${categorie.id}" href="#" class="deleteCategorie"><i class="uil-trash-alt"></i></a>
                                    </div>&nbsp;
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>
                            <div class="d-flex justify-content-center mb-3">
                                <a href="" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#standard-modal2"><i class="uil-plus"></i></a>&nbsp;
                            </div>
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-lg-10">
            <table id="articleTable" class="table table-sm dt-responsive nowrap table-hover">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Designation</th>
                    <th>Unite</th>
                    <th>Quantité</th>
                    <th>Poids(Kg)</th>
                    <th>Categorie</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    <c:forEach var="article" items="${articles}">
                        <c:forEach var="unite" items="${article.getUnite()}">
                            <tr>
                                <td><c:out value="${unite.code}"/></td>
                                <td><c:out value="${article.designation}"/></td>
                                <td><c:out value="${unite.designation}"/></td>
                                <td><c:out value="${unite.quantite}"/></td>
                                <td><c:out value="${unite.poids}"/></td>
                                <td><c:out value="${article.getCategorie().getLibelle()}"/></td>
                                <td>
                                        <div>
                                            <a id="${article.id}" data-bs-toggle="modal" data-bs-target="#new-article" class="btn-sm btn-info editArticleBtn"><i class="uil-pen"></i></a>
                                            <a id="${article.id}" class="btn-sm btn-danger deleteArticleBtn "><i class="uil-trash-alt"></i></a>
                                            <a id="${article.id}" class="btn-sm btn-warning hideArticleBtn"><i class="uil-eye-slash"></i></a>
                                        </div>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:forEach>
                </tbody>
            </table>
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


<%@ include file="template/footer.jsp" %>
<%@ include file="template/setting.jsp" %>