$(function () {


    /*

    Tableau de bord societe

     */

    let namespace = "#dashboard-administrateur "
    let NEW = "nouveau", EDIT = "editer";

    /*
    event create new societe
     */

    $(namespace + "#btn-nouveau-societe").on('click', function () {
        $(namespace + "#nouveau-societe .modal-title").text("Nouveau Societe")
        $(namespace + "#nouveau-societe").modal('show')
        $(namespace + "#nouveau-societe").attr('data-id', NEW)
    })


    /*
     edit societe
     */

    $(document).on('click', namespace + ' .btn-editer-societe', function () {
        $(namespace + "#nouveau-societe .modal-title").text('Editer Societe')
        $(namespace + "#nouveau-societe").modal('show')
        $(namespace + "#nouveau-societe").attr('data-id', EDIT)
        $cardCurrent = $(this).closest('.item-societe').attr('id');

        // affecter les valeur

        $(namespace + '#nouveau-societe input#input-nom').val($(namespace + '#' + $cardCurrent + ' .label-nom').text())
        $(namespace + '#nouveau-societe input#input-adresse').val($(namespace + '#' + $cardCurrent + ' .label-adresse').text())
        $(namespace + '#nouveau-societe input#input-contact').val($(namespace + '#' + $cardCurrent + ' .label-contact').text())
        $(namespace + '#nouveau-societe input#input-slogan-i').val($(namespace + '#' + $cardCurrent + ' .label-slogan-i').text())
        $(namespace + '#nouveau-societe input#input-slogan-ii').val($(namespace + '#' + $cardCurrent + ' .label-slogan-ii').text())
    })

    /*
     enregsitrement societe
     */

    $(namespace + "#nouveau-societe #btn-enregistrer-societe").on('click', function () {
        $nom = $(namespace + '#nouveau-societe input#input-nom').val()
        $adresse = $(namespace + '#nouveau-societe input#input-adresse').val()
        $contact = $(namespace + '#nouveau-societe input#input-contact').val()
        $username = $(namespace + '#nouveau-societe input#input-username').val()
        $password = $(namespace + '#nouveau-societe input#input-password').val()
        $sloganI = $(namespace + '#nouveau-societe input#input-slogan-i').val()
        $sloganII = $(namespace + '#nouveau-societe input#input-slogan-ii').val()
        $logo = $(namespace + '#input-logo').val();

        $typeOperation = $(namespace + "#nouveau-societe").attr('data-id');

        switch ($typeOperation) {
            case NEW:
                $(namespace + '.liste-societe').append(createItemSociete(new Date().toLocaleTimeString(), $nom, $adresse, $contact, $sloganI, $sloganII))
                createToast('bg-success', 'uil-file-check', 'Nouveau Societe cree', 'Creation d\'un nouveau societe fait!');
                break;
            case EDIT :
                $(namespace + '#' + $cardCurrent + ' .label-nom').text($nom)
                $(namespace + '#' + $cardCurrent + ' .label-adresse').text($adresse)
                $(namespace + '#' + $cardCurrent + ' .label-contact').text($contact)
                $(namespace + '#' + $cardCurrent + ' .label-slogan-i').text($sloganI)
                $(namespace + '#' + $cardCurrent + ' .label-slogan-ii').text($sloganII)
                break;
        }

        // empty input text

        $(namespace + '#nouveau-societe input#input-nom').val(' ')
        $(namespace + '#nouveau-societe input#input-adresse').val(' ')
        $(namespace + '#nouveau-societe input#input-contact').val(' ')
        $(namespace + '#nouveau-societe input#input-username').val(' ')
        $(namespace + '#nouveau-societe input#input-password').val('')
        $(namespace + '#nouveau-societe input#input-slogan-i').val('')
        $(namespace + '#nouveau-societe input#input-slogan-ii').val('')
    })

    /*
     suppression societe
     */

    $(document).on('click', '.btn-desactiver-societe', function () {
        $cardCurrent = $(this).closest('.item-societe').attr('id');
        $idModal = 'desactiver-societe';
        create_confirm_dialog('Suppression Filial', 'Voulez vous vraiment desactiver le societe', $idModal, 'Oui, desactiver', 'btn-danger')
            .on('click', function () {
                $(namespace + '.label-statut').toggleClass('bg-danger')
                $(namespace + '.label-statut').toggleClass('bg-success')

                $(this).text($(this).text() == 'Desactive' ? 'Active' : 'Desactive');
                hideAndRemove($(namespace + '#' + $idModal))
            })
    })


    /*

    HTML CONTENT FILIAL

     */

    function createItemSociete($id, $nom, $adresse, $contact, $sloganI, $sloganII) {
        return `<div id='item-societe-` + $id + `' class="col-3 item-societe">
    <div class="card d-block">
      <div class="card-body">
        <div class="dropdown card-widgets">
          <a href="#" class="dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="dripicons-dots-3"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <!-- item-->
            <a class="dropdown-item"><i class="mdi mdi-cog me-1"></i>Gerer</a>
            <!-- item-->
            <a class="dropdown-item btn-editer-societe"><i class="mdi mdi-pencil me-1"></i>Modifie</a>
            <!-- item-->
            <a class="dropdown-item btn-desactiver-societe"><i class="mdi mdi-delete me-1"></i>Desactive</a>
          </div>
        </div>
        <!-- project title-->
        <h4 class="mt-0">
          <img src="http://localhost:8080/assets/images/logo.png" alt="" class="img-circle logo-entreprise img-fluid">
          <a href="" class="text-title label-nom">` + $nom + `</a>
        </h4>
        <div class="badge bg-danger mb-3 label-statut">Suspendu (activation requis)</div>

        <p class="text-muted font-13 mb-3"><span class="label-adresse">` + $adresse + `</span> - <span class="label-contact">` + $contact + `</span>
        <p class="text-muted font-13 mb-3"><span class="label-slogan-i">"` + $sloganI + `"</span> <br> <span class="label-slogan-ii">"` + $sloganII + `"</span>
        </p>

        <!-- project detail-->
        <p class="mb-1">
                                            <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                                <i class="mdi mdi-format-list-bulleted-type text-muted"></i>
                                                <b>00</b> Filial
                                            </span>
          <span class="text-nowrap mb-2 d-inline-block">
                                                <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                                <b>00</b> Magasin
                                            </span>
        </p>
        <div id="tooltip-container">
          <span>Chiffre d'affaire : </span>
          <a class="d-inline-block text-muted fw-bold ms-2">
            0 Ar
          </a>
        </div>
      </div> <!-- end card-body-->
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-3">
          <!-- project progress-->
          <p class="mb-2 fw-bold">Recette <span class="float-end">100%</span></p>
          <div class="progress progress-sm">
            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                 style="width: 100%;">
            </div><!-- /.progress-bar -->
          </div><!-- /.progress -->
        </li>
      </ul>
    </div> <!-- end card-->
  </div>`
    }
})