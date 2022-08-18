<%--
  Created by IntelliJ IDEA.
  User: tombo augustin
  Date: 18/08/2022mini
  Time: 09:11
  To change this template use File | Settings | File Templates.
--%>
<!-- Standard modal -->
<%@ page contentType="text/html; charset=UTF-8" %>
<div id="info-dette-cf" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="num-facture"></h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <input type="hidden" id="user-id" value-id="${connectedUser.id}">
            <input type="hidden" id="filiale-id" value-id="${connectedUser.filiale.id}">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <a class="btn btn-success btn-export-to-excel"><i class="uil-navigator"></i>&nbsp;</a>
                            </div>
                            <div>
                                <a type="button" class="btn btn-outline-secondary mr-1 btn-nouveau-dette" data-bs-target="#nouveau-dette"
                                   data-bs-toggle="modal"><i
                                                          class="uil-file-plus">&nbsp;</i>Nouveau Dette</a>
                            </div>
                        </div>
                        <table id="table-dette-cf" class="table table-hover table-striped norwap table-sm dt-responsive">
                            <thead>
                                <th>Facture</th>
                                <th>Date</th>
                                <th>Montant</th>
                                <th>Payer</th>
                                <th>Reste</th>
                                <th>Mode de payement</th>
                                <th>Status</th>
                                <th>Date échéance</th>
                                <th>Description</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-inline-flex">
<%--                <button type="button" class="btn btn-primary w-100 m-0"><i class="uil-print"></i>&nbsp;Imprimer</button>--%>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->