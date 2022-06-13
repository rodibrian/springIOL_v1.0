function set_select_option_value($array, $select) {
    $.each($array, function (key, value) {
        $($select)
            .append($("<option></option>")
                .attr("value", value[0])
                .text(value[1]));
    });
}

function get_select_affect_to_input($input, $id_element, $text_element) {
    $($input).attr('value-id', $id_element)
    $($input).attr('value', $text_element)
}

function push_to_table_list($table, $id, $array_td) {
    $tr = $('<tr></tr>').attr('id', $id);

    for (let i = 0; i < $array_td.length; i++)
        $tr.append($('<td></td>').text($array_td[i]))

    $($table + ' tbody').append($tr);
}

function create_confirm_dialog($title, $dialogContent, $modalId, $labelButton) {

    $modal = $('' +
        '<div>'+
        '<div id="' + $modalId + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">\n' +
        '    <div class="modal-dialog modal modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h4 class="modal-title" id="standard-modalLabel">' + $title + '</h4>\n' +
        '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                ' + $dialogContent + '\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>\n' +
        '                <button id="btn-' + $modalId + '" type="button" class="btn btn-primary">' + $labelButton + '</button>\n' +
        '            </div>\n' +
        '        </div><!-- /.modal-content -->\n' +
        '    </div><!-- /.modal-dialog -->\n' +
        '</div></div><!-- /.modal -->\n');

    $('.all-modal').append($modal.html());
    $('#' + $modalId).modal('show')

    return $('button#btn-' + $modalId);
}