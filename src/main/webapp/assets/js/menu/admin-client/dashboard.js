$(function () {

    /*------------------------------------
            Tableau de bord filial
     -----------------------------------*/

    let namespace = "#dashboard-admin-client "
    let NEW = "nouveau", EDIT = "editer";

    // event create new filial

    $(namespace + "#btn-nouveau-filial").on('click', function () {

        $(namespace + "#nouveau-filial .modal-title").text("Nouveau filial")
        $(namespace + "#nouveau-filial").modal('show')
        $(namespace + "#nouveau-filial").attr('data-id', NEW)

    })

    /*
     event activatiot filial
     */
    $(document).on('click', namespace + ' .btn-activer-filial', function () {
        $(namespace + "#activation-filial").modal('show')
    })
    /*
     edit filial
     */
    $(document).on('click', namespace + ' .btn-editer-filial', function () {

        $(namespace + "#nouveau-filial .modal-title").text('Editer filial')
        $(namespace + "#nouveau-filial").modal('show')
        $(namespace + "#nouveau-filial").attr('data-id', EDIT)
        $cardCurrent = $(this).closest('.item-filial').attr('id');

        // affecter les valeur

        $(namespace + '#nouveau-filial input#input-nom').val($(namespace + '#' + $cardCurrent + ' .label-nom').text())
        $(namespace + '#nouveau-filial input#input-adresse').val($(namespace + '#' + $cardCurrent + ' .label-adresse').text())
        $(namespace + '#nouveau-filial input#input-contact').val($(namespace + '#' + $cardCurrent + ' .label-contact').text())
    })
    /*
     enregsitrement filial
     */
    function onCreateSubsdiariesSuccess() {

        switch ($typeOperation) {
            case NEW:
                $(namespace + '.liste-filial').append(createItemFilial($filiale.id, $nom, $adresse, $contact))
                createToast('bg-success', 'uil-file-check', 'Nouveau Filial cree', 'Creation d\'un nouveau filial fait!');
                break;
            case EDIT :
                $(namespace + '#' + $cardCurrent + ' .label-nom').text($nom)
                $(namespace + '#' + $cardCurrent + ' .label-adresse').text($adresse)
                $(namespace + '#' + $cardCurrent + ' .label-contact').text($contact)
                break;
        }
        // empty input text
        $(namespace + '#nouveau-filial input#input-nom').val(' ')
        $(namespace + '#nouveau-filial input#input-adresse').val(' ')
        $(namespace + '#nouveau-filial input#input-contact').val(' ')
        $(namespace + '#nouveau-filial input#input-username').val(' ')
        $(namespace + '#nouveau-filial input#input-password').val('')
    }

    function persistDefaultStore() {
        $default_magasin = {
            adresse: $filiale.adresse,
            nomMagasin: "default_magasin",
            filiale: {
                id: $filiale.id
            }
        };
        $admin_filiale_user = {
            username: $username,
            password: $password,
            fonction: {
                id: $fonction.id
            },
            filiale: {
                id: $filiale.id
            },
            magasin : [$default_magasin],
            enabled: true
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/magasins",
            contentType: "application/json",
            data: JSON.stringify($default_magasin),
            success: function (data) {
            }
        })
    }

    function persistFiliale(){
        $filiale = {};
        $filiale.nom = $nom;
        $filiale.adresse = $adresse;
        $filiale.contact = $contact;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/subsidiaries",
            contentType: "application/json",
            data: JSON.stringify($filiale),
            success: function (data){
                $filiale = data;
                persistFonction();
            }
        })
    }

    function persistDefaultUser() {
        $default_magasin = {
            adresse: $filiale.adresse,
            nomMagasin: "default_magasin",
            filiale: {
                id: $filiale.id
            }
        };
        $admin_filiale_user = {
            username: $username,
            password: $password,
            fonction: {
                id: $fonction.id
            },
            filiale: {
                id: $filiale.id
            },
            magasin : [$default_magasin],
            enabled: true
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/users",
            contentType: "application/json",
            data: JSON.stringify($admin_filiale_user),
            success: function (data) {
                $admin_filiale_user = data;
            }
        })
    }
    function persistFonction() {
        $fonction = {
            nomFonction: "admin",
            fonctionnalites: [{
                nom: "all"
            }],
            filiale : {id : $filiale.id}
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/fonctions",
            contentType: "application/json",
            data: JSON.stringify($fonction),
            success: function (data) {
                $fonction = data;
                persistDefaultUser();
                onCreateSubsdiariesSuccess();
            }
        })
    }
    /*
     enregistrement filial
    */


    /*
    mask et validation
     */

    $(namespace + "#nouveau-filial form #input-contact").mask('+261 99 99 999 99')

    $(namespace + '#nouveau-filial form').validate({
        rules : {
            nom : {required : true},
            adresse : {required : true},
            contact : {required : true},
            inputUsername : {required : true},
            inputPassword : {required : true, minlength : 4}
        },
        messages : {
            nom : {required : "Nom du filial requis"},
            adresse : {required : "Adresse du filial requis"},
            contact : {required : "Contact du filial requis"},
            inputUsername : {required : "Nom d'utilisateur requis"},
            inputPassword : {required : "Mot de passe requis", minlength : "Minimum de mot de passe 04 caractères"}
        }
    })

    function validation_nouveau_filial() {
        $(namespace + '#nouveau-filial form').validate();

        return $(namespace + '#nouveau-filial form').valid();
    }


    $(namespace + "#nouveau-filial #btn-enregistrer-filial").on('click', function () {
        if (validation_nouveau_filial()) {
            $nom = $(namespace + '#nouveau-filial input#input-nom').val()
            $adresse = $(namespace + '#nouveau-filial input#input-adresse').val()
            $contact = $(namespace + '#nouveau-filial input#input-contact').val()
            $username = $(namespace + '#nouveau-filial input#input-username').val()
            $password = $(namespace + '#nouveau-filial input#input-password').val()
            $typeOperation = $(namespace + "#nouveau-filial").attr('data-id');
            persistFiliale();

            $(namespace + '#nouveau-filial').modal('hide')
        }
    })
    /*
     suppression filial
     */
    $(document).on('click', '.btn-desactiver-filial', function () {
        $cardCurrent = $(this).closest('.item-filial').attr('id');
        $idModal = 'desactiver-filial';
        create_confirm_dialog('Suppression Filial', 'Voulez vous vraiment desactiver le filial', $idModal, 'Oui, desactiver', 'btn-danger')
            .on('click', function () {
                $(namespace + '.label-statut').toggleClass('bg-danger')
                $(namespace + '.label-statut').toggleClass('bg-success')

                $(this).text($(this).text() == 'Desactive' ? 'Active' : 'Desactive');
                hideAndRemove($(namespace + '#' + $idModal))
            })
    });

    /*
    HTML CONTENT FILIAL
     */

    function createItemFilial($id, $nom, $adresse, $contact) {
        return `
            <div  id='` + $id + `' class="col-3 item-filial">
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
                                <a class="dropdown-item btn-editer-filial"><i class="mdi mdi-pencil me-1"></i>Modifie</a>
                                <!-- item-->
                                <a class="dropdown-item btn-activer-filial"><i class="mdi mdi-key me-1"></i>Activer</a>
                                <!-- item-->
                                <a class="dropdown-item btn-desactiver-filial"><i class="mdi mdi-delete me-1"></i>Desactive</a>
                            </div>
                        </div>
                        <!-- project title-->
                        <h4 class="mt-0">
                            <a href="" class="text-title label-nom">` + $nom + `</a>
                        </h4>
                        <div class="badge bg-danger mb-3 label-statut">Suspendu (activation requis)</div>
                        <p class="text-muted font-13 mb-3"><span class="label-adresse">` + $adresse + `</span> - <span class="label-contact">` + $contact + `</span></p>

                         <!-- project detail-->
                         <p class="mb-1">
                            <span class="pe-2 text-nowrap mb-2 d-inline-block">
                               <i class="mdi mdi-format-list-bulleted-type text-muted"></i>
                               <b>00</b> Utilisateur
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
                            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                            </div><!-- /.progress-bar -->
                          </div><!-- /.progress -->
                        </li>
                    </ul>
                </div> <!-- end card-->
            </div>`
    }


    /*

    ACTIVATION FILIAL

     */

    //mask et validation

    $(namespace + '#activation-filial form #text').mask('9999-9999-9999')

    $(namespace + '#activation-filial form').validate({
        rules : {
            text : {required : true}
        },
        messages : {
            text : {required : ""}}
    })

    function validation_activation_filial() {
        $(namespace + '#activation-filial form').validate();

        return $(namespace + '#activation-filial form').valid();
    }

    $(namespace + '#activation-filial #btn-validation').on('click', function() {
        if (validation_activation_filial()) {
            createToast('bg-success', 'uil-check', 'Activation Filial fait', 'Activation du filial fait avec succès!!');
            $(namespace + '#activation-filial').modal('hide')
        }
        else createToast('bg-danger', 'uil-check', 'Activation Filial éronné', 'Activation du filial non fait!!');

    })

})