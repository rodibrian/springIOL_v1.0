<%--
  Created by IntelliJ IDEA.
  User: tombo augustin
  Date: 23/08/2022
  Time: 12:57
  To change this template use File | Settings | File Templates.
--%>
<!-- Standard modal -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div id="mode-payement-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <form class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="standard-modalLabel">Changer mode de payement</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
                <label for="description" class="form-label">Type de payement</label>
                <select class="form-select" id="type-payement">
                    <option value="CREDIT">Credit</option>
                    <option value="ESPECE">Espèces</option>
                    <option value="MOBILE_MONEY">Mobile Money</option>
                    <option value="CHEQUE">Chèques</option>
                    <option value="VIREMENT">Virement</option>
                    <option value="CONSOMMATION">Consommation interne</option>
                </select>
                <label for="description" class="form-label">description</label>
                <textarea name="description" id="description" class="form-control"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                <button id="save-payement-mode-btn" type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
        </form><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->