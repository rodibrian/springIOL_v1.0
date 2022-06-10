$(function() {
    // hide default select voyage
    $('.select-voyage').hide();
    $('#checkMagasin').attr('checked','')

    $('#checkMagasin').click(function() {
        $('.select-voyage').hide();
        $('.select-magasin').show();
        $('#checkVoyage').removeAttr('checked')
        //$('#checkMagasin').attr('checked','');
    })

    $('#checkVoyage').click(function() {
        $('.select-voyage').show();
        $('.select-magasin').hide();
        $('#checkMagasin').removeAttr('checked')
        //$('#checkVoyage').attr('checked','');
    })
})