function appendOptionToSelect($value, $select) {
    $($select)
        .append($("<option></option>")
            .attr("value", $value[0])
            .text($value[1]));
}

function create_reference(type, date) {
    let time = date.getTime();
    switch (type) {
        case "VENTE" :
            return "VT-" + time;
        case "INVENTAIRE" :
            return "INV-" + time;
        case "SORTIE" :
            return "SORT-" + time;
        case "ENTRE" :
            return "ENT-" + time;
        case "AVOIR" :
            return "AV-" + time;
        case "TRANSFERT":
            return "TF-" + time;
        case "DECAISSEMENT" :
            return "DEC-" + time;
        case "ENCAISSEMENT" :
            return "ENC-" + time;
    }
}

function set_select_option_value($array, $select) {
    let children = $($select).children();
    if (children.length === 0) {
        appendOptionToSelect($array, $select);
    } else {
        let tab = [];
        for (let i = 0; i < children.length; i++) {
            let oldValue = $(children[i]).text();
            tab.push(oldValue);
        }
        let ok = tab.every(value => value !== $array[1]);
        if (ok) appendOptionToSelect($array, $select);
        tab = [];
    }
}

function set_select_option_value_or_update_option($array, $select, $isCreate) {
    $array = convertiMultiObjectToArray($array)
    $.each($array, function (key, value) {
        if ($isCreate) {
            $($select)
                .append($("<option></option>")
                    .attr("value", value[0])
                    .text(value[1]));
        } else {
            let option = $("#menu-entree-article #select-unite-article").children()[0];
            $(option).attr("value", value[0]).text(value[1]);
        }
    });
}

function set_select_option_value_ajax($array, $select) {
    $.each($array, function (key, value) {
        $($select)
            .append($("<option></option>")
                .attr("value", value.id)
                .text(value.nomMagasin));
    });
}

function push_select_option_value($array, $select) {
    $($select)
        .append($("<option></option>")
            .attr("value", $array[0])
            .text($array[1]));
}

function push_item_table(type, value, table_id) {
    let tr = [];
    let tr_id = "";
    if (type === "ARTICLE") {
        tr = [value.itemName, value.uniteName, value.stock, value.price];
        tr_id = value.itemId + "-" + value.uniteId;
    } else if (type === "CLIENT" || type === "FOURNISSEUR") {
        tr = [value.nom, value.adresse, value.numTel];
        tr_id = value.id;
    }
    push_to_table_list(table_id, tr_id, tr);
}

function append_data_to_table(table_id, type, data, tab) {
    $(table_id + " tbody").empty();
    data.forEach(value => {
        push_item_table(type, value, table_id);
        if (tab.length === 0) tab.push(value);
        else {
            let finded_item = tab.find(create_consumer("BY_ID", type, value));
            if (finded_item === undefined) tab.push(value);
        }
    })
}

const create_consumer = (consumer_type, item_type, value) => {
    return consumer_type === "NAME" ? create_consumer_by_name(item_type, value) : create_consumer_by_id(item_type, value);
}

const create_consumer_by_name = (item_type, value) => {
    return item_type === "ARTICLE" ? (article) => article.itemName.search(value) !== -1 :
        (cf) => cf.nom.search(value) !== -1;
}

const create_consumer_by_id = (item_type, value) => {
    return item_type === "ARTICLE" ? (item) => item.itemId === value.itemId && item.uniteId === value.uniteId :
        (item) => item.id === value.id;
}

function find_item(table_id, filiale_id, item_name, type, tab) {
    let url = "";
    if (type === "ARTICLE") url = "http://localhost:8080/api/v1/subsidiaries/" + filiale_id + "/itemsInfo/" + item_name;
    else url = "http://localhost:8080/api/v1/externalEntities/" + (type === "CLIENT" ? "0" : "1") + "/" + filiale_id;
    execute_ajax_request("get", url, null, (data) => append_data_to_table(table_id, type, data, tab))
}

function fetch_item(url, tab, table_id, item_type) {
    execute_ajax_request("get", url, null, (data) => append_data_to_table(table_id, item_type, data, tab))
}

const init_input_search_keyup = function (item_type, input_id, table_id, filiale_id, tab) {
    $(document).on("keyup", input_id, function () {
        let item_name = $(input_id).val().toLowerCase().trim();
        $(table_id + " tbody").empty();
        if (item_name !== '') {
            let finded_item = tab.find(create_consumer("NAME", item_type, item_name));
            if (finded_item === undefined) find_item(table_id, filiale_id, item_name, tab);
            else push_item_table(item_type, finded_item, table_id);
        } else if (tab.length !== 0) tab.forEach(value => push_item_table(item_type, value, table_id));
    });
}

function get_select_affect_to_input($input, $id_element, $text_element) {
    $($input).attr('value-id', $id_element)
    $($input).attr('value', $text_element)
}

function push_to_table_list($table, $id, $array_td) {
    $tr = $('<tr></tr>').attr('id', $id);
    for (let i = 0; i < $array_td.length; i++) $tr.append($('<td></td>').html($array_td[i]))
    $($table + ' tbody').append($tr);
    return $tr;
}


const createStatus = (montant)=>{
    if (montant===0) return "payé";
    else return "non payé";
}

const createBadge = (montant)=>{
    if (montant===0) return "badge badge-success-lighten";
    else return "badge badge-warning-lighten";
}

function fetch_trosa_data(namespace,$cf_id){
    let url = "http://localhost:8080/api/v1/trosas/cf/" + $cf_id;
    execute_ajax_request("get", url, null, (data) => appendItem(namespace,data))
}

const init_btn_payer_trosa = (namespace)=>{
    $(document).on('click', namespace + '#table-dette-cf .payer-trosa',function(){
        $trosa_id = $(this).closest("tr").attr("id");
        // get montant
        $montant_reste = parseFloat($(this).closest('tr').children('td').eq(4).text());
        $(namespace + '#modal-payement-dette form').validate();
        $(namespace + '#modal-payement-dette input#Montant-payer').val($montant_reste)
        $(namespace + '#modal-payement-dette').modal('show')
    })
}

function init_enregistrer_trosa_btn(namespace, type_trosa){
    $(namespace + '#nouveau-dette #btn-enregistrer-dette-fournisseur').on('click', function () {
        if (validation_nouveau_dette(namespace)){
            $montant = $(namespace + '#nouveau-dette input#somme').val();
            $description = $(namespace + '#nouveau-dette textarea#description').val();
            $date_dette = $(namespace + "#date-dette").val();
            $date_echeance = $(namespace + "#date-echeance").val();
            let trosa = {};
            trosa.clientFournisseur = {id: $cf_id};
            trosa.montant = $montant;
            trosa.description = $description;
            trosa.typeTrosa = type_trosa;
            trosa.date = $date_dette;
            trosa.dateEcheance = $date_echeance;
            trosa.reste = $montant;
            let url = "http://localhost:8080/api/v1/trosas";
            execute_ajax_request("post", url, trosa, (data) => {
                let tr = ["",
                    trosa.date,
                    trosa.montant,
                    0,
                    trosa.montant,
                    '-',
                    `<span class="badge ` + createBadge($montant) + `">` + createStatus($montant) + `</span>`,
                    trosa.dateEcheance,
                    trosa.description,init_action_column(trosa.reste)];
                push_to_table_list(namespace + '#table-dette-cf', data.id, tr);
                createToast('bg-success', 'uil-check-sign', 'Dette enregistre', 'Nouveau dette enregistre avec success!');
                $(namespace + '#nouveau-dette input').val('');
                $(namespace + '#nouveau-dette textarea').val('');
            });
            $(namespace + '#nouveau-dette').modal('hide');
        }
    })
}

const init_modal_credit_dette_btn = (namespace, type_trosa,filiale_id,user_id)=>{
    // payement trosa
    push_Type_paiement(namespace + '#modal-payement-dette #type-paiement');

    // INIT BOUTON PAYER TROSA
    init_btn_payer_trosa(namespace);

    init_enregistrer_trosa_btn(namespace,type_trosa);

    supprimer_dette(namespace);

    /* ACTUALISER LISTE */
    $(namespace+".refresh-list-btn").click(()=> fetch_trosa_data(namespace,user_id))

    /* validation payement */
    init_validation_payement(namespace);

    init_payement_dette_btn(namespace,type_trosa,filiale_id,user_id);
}

function supprimer_dette(namespace) {
    $(document).on('click', namespace + '#table-dette-cf .delete-trosa',()=>{
        $modalId = "suppression-dette-fournisseur"
        create_confirm_dialog('Suppression dette', 'Voulez vraiment supprimer les dettes impayes ?', $modalId, 'Oui, supprimer tout', 'btn-danger')
            .on('click', function () {
                // $(namespace + '.table-dette-fournisseur tbody tr').remove();
                hideAndRemove('#' + $modalId);
                createToast('bg-danger', 'uil-check-sign', 'Dette supprime', 'Tout les dettes fournisseur sont supprimer avec success!');
            })
    })
}

const init_payement_dette_btn = (namespace,type_trosa,filiale_id,user_id)=>{

    $(namespace + '#modal-payement-dette .btn-enregistrer-payement-dette').on('click',function(){
        // if (validation_payement_dette(namespace)){
            let montant_payer = $(namespace+"#Montant-payer").val();
            let type_payement = $(namespace+"#type-paiement option:selected").val();
            let description = $(namespace+"#description-payement").val();
            let ifc = {};
            ifc.description = description;
            ifc.montantOperation = montant_payer;
            ifc.reference =create_reference("DECAISSEMENT",new Date());
            ifc.operationCaisse = "DETTE" === type_trosa ? "DECAISSEMENT" : "ENCAISSEMENT";
            ifc.user = {id:user_id};
            ifc.modePayement = type_payement;
            ifc.filiale = {id:filiale_id};
            ifc.date = new Date();
            let url = "http://localhost:8080/api/v1/ifc";
            execute_ajax_request("post",url,ifc,(data)=>{
                $(namespace+"#Montant-payer").val("");
                $(namespace+"#description-payement").val("");
                $(namespace + '#modal-payement-dette').modal('hide');
                update_reste(namespace,montant_payer);
            });
    })

    function update_reste(namespace,montant_payer) {
        let montant_reste = $montant_reste - parseFloat(montant_payer);
        execute_ajax_request("put", "http://localhost:8080/api/v1/trosas/" + $trosa_id, montant_reste, (data) => {
            createToast('bg-success', 'uil-check', 'Dette payé', 'Dette payé avec succès');
        });
    }
}

const init_validation_payement = (namespace)=>{

    $(namespace + "#nouveau-dette form").validate({
        rules : {
            dateDette : {required : true},
            dateEcheance : {required : true},
            montant : {required : true, min: 0.0001}
        },
        messages : {
            dateDette : {required : "Date du dette requis"},
            dateEcheance : {required : "Date d'echeance requis"},
            montant : {required : "Montant du dette requis", min: "Le montant doit être >0"}}
    })

    $(namespace + '#modal-payement-dette form').validate( {
        rules : {
            montantPayer : { required : true, min : 0.0001, max : 10000000},
        },
        messages : {
            montantPayer : { required : "Montant payer requis", min : "Montant payer doit être >0", max : "Le montant depasse le dette"},
        }
    })

}

function validation_payement_dette(namespace) {
    $(namespace + '#modal-payement-dette form').validate();
    return $(namespace + '#modal-payement-dette form').valid();
}

function validation_nouveau_dette(namespace){
    $(namespace + '#nouveau-dette form').validate();
    return $(namespace + '#nouveau-dette form').valid();
}

const  init_dblclick_table = (namespace,$table) =>{
    $(document).on('dblclick',namespace +$table+' tbody tr',function(){
        if ($table.search("client")!==-1){
            $(namespace+".btn-nouveau-dette").text(" Nouveau credit ");
            $(namespace+"#standard-modalLabel").text(" Nouveau credit ")
            $(namespace+".label-date-dette").text("Date credit");
            $(namespace+"#mySmallModalLabel").text("payement credit");
        }else{
            $(namespace+".btn-nouveau-dette").text(" Nouvelle dette ");
            $(namespace+"#standard-modalLabel").text(" Nouvelle dette ");
            $(namespace+".label-date-dette").text("Date dette");
            $(namespace+"#mySmallModalLabel").text("payement dette");
        }
        $(namespace+"#info-dette-cf").modal("show");
        $cf_id = $(this).attr("id");
        fetch_trosa_data(namespace,$cf_id);
    })
}

function appendItem(namespace,data){
    $(namespace + '#table-dette-cf tbody').empty();
    data.forEach(value => {
        let tr = [value.reference,
            value.date,
            value.montant,
            value.montant - value.reste,
            value.reste,
            value.typePayement,
            `<span class="badge ` + createBadge(value.reste) + `">` + createStatus(value.reste) + `</span>`,
            value.dateEcheance,
            value.description,init_action_column(value.reste)];
        push_to_table_list(namespace + '#table-dette-cf',value.id, tr);
    })
}

const init_action_column = (reste)=>{
    let action =  `<a  class="btn-sm btn-danger delete-trosa"><i class="uil-trash-alt"></i></a>`;
    return reste === 0 ? action : action+`<a  class="btn-sm btn-info payer-trosa"><i class="uil-money-withdrawal"></i></a>`;
}

const clear_table = ($table) => {
    $($table+" tbody").empty();
}

const  init_seach_cf_btn = (type,namespace,table,$filiale_id)=>{

    $(namespace+"#search-btn").click(()=>{
        let text = $(namespace +"#top-search").val();
        let url = "http://localhost:8080/api/v1/externalEntities/"+type+"/"+$filiale_id+"/name/"+text;
        execute_ajax_request("get",url,null,(data)=> {
            clear_table(namespace + table);
            data.forEach(value=>{
                let tr = [value.nom,value.adresse,value.numTel,value.totalMontantTrosa, $('<div class="action-fournisseur">\n' +
                    '                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>\n' +
                    '                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>\n' +
                    '              </div>')];
                push_to_table_list(namespace + table,value.id,tr);
            })
        })

    })
}

function execute_ajax_request(method_type, api_url, data = null, onsuccess) {
    let requestObject = {type: method_type, url: api_url, success: onsuccess, contentType: "application/json"};
    if (data !== null) requestObject.data = JSON.stringify(data);
    $.ajax(requestObject);
}

function push_to_inventory_table_list($table, $id, $array_td) {
    $tr = $('<tr></tr>').attr('id', $id);
    for (let i = 0; i < $array_td.length; i++) {
        if (i !== 4) $tr.append($('<td></td>').html($array_td[i]))
        else {
            $a = $('<a></a>')
                .attr("type", "button")
                .attr("class", "btn-default mr-1 btn-info-stock")
                .attr("data-bs-toggle", "modal")
                .attr("data-bs-target", "#info-stock").html($array_td[i] + " " + $array_td[i - 3])
            $tr.append($('<td></td>').append($a))
        }
    }
    $($table + ' tbody').append($tr);
    return $tr;
}

function push_to_table_list_magasin($array_td) {
    $tr = $('<tr></tr>').attr('id', $array_td[0]);
    for (let i = 1; i < $array_td.length; i++) $tr.append($('<td></td>').html($array_td[i]))
    $('#table-liste-utilisateur-magasin tbody').append($tr);
    return $tr;
}

function update_to_table_list($table, $id, $array_td) {
    $tr = $($table + ' tbody tr#' + $id);
    for (let i = 0; i < $array_td.length; i++) $tr.children().eq(i).html($array_td[i])
}

function create_confirm_dialog($title, $dialogContent, $modalId, $labelButton, $classButton) {
    $modal = $('' + '<div>' + '<div id="' + $modalId + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">\n' + '    <div class="modal-dialog modal modal-dialog-centered">\n' + '        <div class="modal-content was-validated">\n' + '            <div class="modal-header">\n' + '                <h4 class="modal-title" id="standard-modalLabel">' + $title + '</h4>\n' + '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>\n' + '            </div>\n' + '            <div class="modal-body">\n' + '                ' + $dialogContent + '\n' + '            </div>\n' + '            <div class="modal-footer">\n' + '                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>\n' + '                <button id="btn-' + $modalId + '" type="button" class="btn ' + $classButton + '">' + $labelButton + '</button>\n' + '            </div>\n' + '        </div><!-- /.modal-content -->\n' + '    </div><!-- /.modal-dialog -->\n' + '</div></div><!-- /.modal -->\n');
    if (!$('#' + $modalId).length) $('.all-modal').append($modal.html());
    $('#' + $modalId + ' .modal-body').html($dialogContent)
    $('#' + $modalId).modal('show')
    return $('button#btn-' + $modalId);
}

function autoIncrementFromTableTrContent($idTable) {
    return $($idTable + ' tbody').children().length + 1;
}

// DATE FORMAT JS

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}

// CREATE TOAST

function createToast($theme, $icon, $title, $content) {
    // create toast
    $idToast = "toast-" + new Date().getTime().toString();
    $('body').append($('<div>' + '<div class="toast toast-css ' + $theme + ' text-dark" role="alert" id="' + $idToast + '">\n' + '      <div class="toast-header">\n' + $title + '\n' + '      </div>\n' + '      <div class="toast-body">\n' + '        <i class="' + $icon + '"></i>\n' + $content + '\n' + '      </div>\n' + '    </div></div>').html());
    $('#' + $idToast).toast({delay: 3000});
    $('#' + $idToast).toast('show');
    // position CSS toast
    $countToast = $('.toast').length;
    $posBottom = 5 + ($countToast - 1) * 18;
    $('#' + $idToast).css('bottom', $posBottom + 'vh');
    // dynamic toast
    setTimeout(function () {
        $('#' + $idToast).remove();
    }, 6000);
}

// CONVERSION OBJECT TO ARRAY

function convertirObjectToArray($myObj) {
    var array = $.map($myObj, function (value, index) {
        return [value];
    });
    return array;
}

function convertiMultiObjectToArray($tabMyObj) {
    let array = [];
    $.each($tabMyObj, function (key, value) {
        array.push(convertirObjectToArray(value));
    })
    return array;
}

function hideAndRemove($selector) {
    $($selector).modal('hide');
    $($selector).remove();
}

function insert_badge($bg, $label) {
    return `<span class="badge badge-` + $bg + `-lighten">` + $label + `</span>`
}


function enregistrerClientOuFournisseur_(client) {
    let cfResourceUrl = NOUVEAU_FOURNISSEUR ? cfUrl : cfUrl + "/" + idCf;
    let methodType = NOUVEAU_FOURNISSEUR ? "POST" : "PUT";
    $.ajax({
        type: methodType,
        url: cfResourceUrl,
        contentType: 'application/json',
        data: JSON.stringify(client),
        success: function (data) {
            if (NOUVEAU_FOURNISSEUR) {
                $fournisseur = [data.nom, data.adresse, data.numTel, 0, $('<div class="action-fournisseur">\n' +
                    '                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>\n' +
                    '                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>\n' +
                    '              </div>')];
                push_to_table_list(namespace + '#table-fournisseur', data.id, $fournisseur);
                createToast('bg-success', 'uil-icon-check', 'Fournisseur enregistre', 'Fournisseur enregistre avec succes!');
            } else {
                $trFournisseur.children().eq(0).text(nomFournisseur);
                $trFournisseur.children().eq(1).text(adresse);
                $trFournisseur.children().eq(2).text(contact);
                createToast('bg-success', 'uil-icon-check', 'Modification Fournisseur enregistre', 'Modification Fournisseur enregistre avec succes!');
            }
            $(namespace + '#nouveau-fournisseur input').val('');
            NOUVEAU_FOURNISSEUR = true;
        }
    });
}

function addSplitToObject(obj, stringToSplit, splitter) {
    return stringToSplit.split(splitter)
}

function personnaliserMenu($title) {
    $('title').text('IOL - ' + $title)
}


function exportToExcel($btn, $prefix, $table) {
    $filename = 'file-' + new Date().getTime().toString() + '.xls';
    $($btn).on('click', function () {
        console.log($prefix)
        $($table).table2excel({
            filename: $filename
        });
    })
}

function exportToExcelCustomBtn($btn, $prefix, $table) {
    $filename = 'file-' + new Date().getTime().toString() + '.xls';
    $($btn).on('click', function () {
        $($table).table2excel({
            filename: $filename
        });
    })
}


function push_Type_paiement($selectID){
    $($selectID).append('' +
        ' <option value="ESPECE">Espèces</option>' +
        ' <option value="MOBILE_MONEY">Mobile Money</option>' +
        ' <option value="CHEQUE">Chèques</option>' +
        ' <option value="VIREMENT">Virement</option>')
}