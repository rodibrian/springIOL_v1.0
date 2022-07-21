
function appendOptionToSelect($value,$select) {
    $($select)
        .append($("<option></option>")
            .attr("value",$value[0])
            .text($value[1]));
}

function set_select_option_value($array,$select) {
    let children = $($select).children();
    if (children.length===0){
        appendOptionToSelect($array,$select);
    }else{
        let tab = [];
        for(let i = 0 ; i<children.length;i++){
             let oldValue = $(children[i]).text();
             tab.push(oldValue);
        }
        let ok = tab.every(value => value!==$array[1]);
        if (ok) appendOptionToSelect($array,$select);
        tab = [];
    }
}

function set_select_option_value_or_update_option($array,$select,$isCreate) {
    $array = convertiMultiObjectToArray($array)
    $.each($array, function (key, value) {
        if ($isCreate){
            $($select)
                .append($("<option></option>")
                    .attr("value", value[0])
                    .text(value[1]));
        }else{
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
        console.log($($select).html())
    });
}

function deleteMagasin(){

}

function push_select_option_value($array, $select) {
    $($select)
        .append($("<option></option>")
            .attr("value", $array[0])
            .text($array[1]));
}

function get_select_affect_to_input($input, $id_element, $text_element) {
    $($input).attr('value-id', $id_element)
    $($input).attr('value', $text_element)
}


function push_to_table_list($table, $id, $array_td){
    $tr = $('<tr></tr>').attr('id', $id);
    for (let i = 0; i < $array_td.length; i++) $tr.append($('<td></td>').html($array_td[i]))
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
    $modal = $('' + '<div>' + '<div id="' + $modalId + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">\n' + '    <div class="modal-dialog modal modal-dialog-centered">\n' + '        <div class="modal-content">\n' + '            <div class="modal-header">\n' + '                <h4 class="modal-title" id="standard-modalLabel">' + $title + '</h4>\n' + '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>\n' + '            </div>\n' + '            <div class="modal-body">\n' + '                ' + $dialogContent + '\n' + '            </div>\n' + '            <div class="modal-footer">\n' + '                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>\n' + '                <button id="btn-' + $modalId + '" type="button" class="btn ' + $classButton + '">' + $labelButton + '</button>\n' + '            </div>\n' + '        </div><!-- /.modal-content -->\n' + '    </div><!-- /.modal-dialog -->\n' + '</div></div><!-- /.modal -->\n');
    $('.all-modal').append($modal.html());
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
    var array = $.map($myObj, function(value, index){
        return [value];
    });
    return array;
}

function convertiMultiObjectToArray($tabMyObj) {
    let array = [];
    $.each($tabMyObj, function(key, value) {
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


function enregistrerClientOuFournisseur_(client){
    let cfResourceUrl = NOUVEAU_FOURNISSEUR ? cfUrl :cfUrl+"/"+idCf;
    let methodType = NOUVEAU_FOURNISSEUR ? "POST" : "PUT";
    $.ajax({
        type: methodType,
        url: cfResourceUrl,
        contentType: 'application/json',
        data: JSON.stringify(client),
        success: function (data){
            if (NOUVEAU_FOURNISSEUR){
                $fournisseur = [data.nom,data.adresse,data.numTel,0, $('<div class="action-fournisseur">\n' +
                    '                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>\n' +
                    '                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>\n' +
                    '              </div>')];
                push_to_table_list(namespace + '#table-fournisseur',data.id, $fournisseur);
                createToast('bg-success', 'uil-icon-check', 'Fournisseur enregistre', 'Fournisseur enregistre avec succes!');
            }else {
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

function publicite() {
    console.log('-- Publicite --')
}

function personnaliserMenu($title) {
    $('title').text('IOL - ' + $title)
}