$(function () {
    /*--------------------------
        MENU FOURNISSEUR
     ----------------------------*/
    let namespace = "#menu-fournisseur ";
    let cfUrl = "http://localhost:8080/api/v1/externalEntities";
    let idCf = 1;
    let NOUVEAU_FOURNISSEUR = true;
    $montant_reste = 0;
    $filialeId = $(namespace + '#filiale-id').attr("value-id");
    $user_id = $(namespace+"#user-id").attr("value-id");
    exportToExcel(namespace + '.btn-export-to-excel','fournisseurs', namespace + '#table-fournisseur')
    /*
     fermer l'info listes article facture
     */
    $(namespace + '.btn-close-info-credit').click(function () {
        $(namespace + '#info-credit').removeClass("show")
    })
    /*
     nouveau fournisseur
     */
    $(namespace + '.btn-nouveau-fournisseur').on('click', function () {
        $(namespace + '#nouveau-fournisseur').attr('data-value', 'nouveau-fournisseur');
        $(namespace + '#nouveau-fournisseur').modal('show')
        $(namespace + '#nouveau-fournisseur .modal-title').text('Nouveau Fournisseur');
    })
    /*
     editer fournisseur
     */
    $(document).on('click', namespace + '.editFournisseur', function () {
        $(namespace + '#nouveau-fournisseur').attr('data-value', 'editer-fournisseur');
        $(namespace + '#nouveau-fournisseur').modal('show')

        $(namespace + '#nouveau-fournisseur .modal-title').text('Editer Fournisseur');
        $trFournisseur = $(this).closest('tr');
        idCf = $trFournisseur.attr("id");
        $(namespace + '#nouveau-fournisseur input#nom').val($trFournisseur.children().eq(0).text());
        $(namespace + '#nouveau-fournisseur input#adresse').val($trFournisseur.children().eq(1).text());
        $(namespace + '#nouveau-fournisseur input#contact').val($trFournisseur.children().eq(2).text());
        NOUVEAU_FOURNISSEUR = false;
    })
    function enregistrerClientOuFournisseur(fournisseur){
        let cfResourceUrl = NOUVEAU_FOURNISSEUR ? cfUrl :cfUrl+"/"+idCf;
        let methodType = NOUVEAU_FOURNISSEUR ? "POST" : "PUT";
        $.ajax({
            type: methodType,
            url: cfResourceUrl,
            contentType: 'application/json',
            data: JSON.stringify(fournisseur),
            success: function (data){
                if (NOUVEAU_FOURNISSEUR){
                    $fournisseur = [data.nom,data.adresse,data.numTel,0, $('<div class="action-fournisseur">\n' +
                        '                <a id="" class="btn-sm btn-info editFournisseur "><i class="uil-pen"></i></a>\n' +
                        '                <a id="" class="btn-sm btn-danger deleteFournisseur "><i class="uil-trash-alt"></i></a>\n' +
                        '              </div>')];
                    push_to_table_list(namespace + '#table-fournisseur',data.id, $fournisseur);
                    createToast('bg-success', 'uil-icon-check', 'Fournisseur enregistre', 'Fournisseur enregistre avec succes!');
                }else {
                    $trFournisseur.children().eq(0).text(fournisseur.nom);
                    $trFournisseur.children().eq(1).text(fournisseur.adresse);
                    $trFournisseur.children().eq(2).text(fournisseur.numTel);

                    createToast('bg-success', 'uil-icon-check', 'Modification Fournisseur enregistre', 'Modification Fournisseur enregistre avec succes!');
                }
                $(namespace + '#nouveau-fournisseur input').val('');
                NOUVEAU_FOURNISSEUR = true;
            }
        });
    }
    /*
     enregistrement nouveau fournisseur
     */
    /*
    mask et validation
     */
    $(function() {
        $(namespace + 'form').validate({
            rules : {
                nom : {required : true},
                adresse : {required : true},
                contact : {required : true}
            },
            messages : {
                nom : {required : 'Nom du fournisseur requis'},
                adresse: {required : 'Adresse du fournisseur requis'},
                contact : {required : 'Contact requis'}
            }
        })

        $(namespace + 'form input#contact').mask('+261 99 99 999 99')
    })
    function validation_nouveau_founisseur() {
        $(namespace + 'form').validate();

        return $(namespace + 'form').valid();
    }
    $(namespace + '#nouveau-fournisseur #btn-enregistrer-fournisseur').on('click', function () {
        if (validation_nouveau_founisseur()) {
            let nomFournisseur = $(namespace + '#nouveau-fournisseur input#nom').val();
            let adresse = $(namespace + '#nouveau-fournisseur input#adresse').val();
            let contact = $(namespace + '#nouveau-fournisseur input#contact').val();
            let fr = {};
            fr.nom = nomFournisseur;
            fr.adresse = adresse;
            fr.numTel = contact;
            fr.type = 1;
            fr.filiale = {id : $filialeId };
            enregistrerClientOuFournisseur(fr)

            $("#nouveau-fournisseur").modal('hide')
        }

    })
    /*
     click fournisseur tr
     */
    $(document).on('click', namespace + '#table-fournisseur tbody tr', function () {
        // get reference of selected facture
        $trFournisseur = $(this);
        $(namespace + "#info-credit").addClass("show")
    })
    /*
     suppression fournisseur
     */
    $(document).on('click', namespace + '#table-fournisseur .deleteFournisseur', function () {

        $trFournisseur = $(this).closest('tr');
        $idModalDelete = "suppression-fournisseur";
        create_confirm_dialog('Suppression Fournisseur', 'Voulez vous vraiment supprimer ce fournisseur (id : ' + $trFournisseur.attr("id") + ') ?', $idModalDelete, 'Oui,supprimer', 'btn-danger')
            .on('click', function () {

                $trFournisseur.remove();

                createToast('bg-danger', 'uil-trash-alt', 'Suppression fait', 'Le fournisseur est supprime avec success!');

                hideAndRemove('#' + $idModalDelete);

                $(namespace + "#info-credit").removeClass("show")
            })
    })
    /*
    NOUVEAU DETTE
     */
    $(namespace + '.btn-nouveau-dette').on('click', function() {
        $(namespace + '#nouveau-dette input#nomFournisseur').val($trFournisseur.children().eq(0).text())
    })


    /*

    mask et validation

     */

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

    function validation_nouveau_dette() {
        $(namespace + '#nouveau-dette form').validate();
        return $(namespace + '#nouveau-dette form').valid();
    }

    $(namespace + '#nouveau-dette #btn-enregistrer-dette-fournisseur').on('click',function(){
       if (validation_nouveau_dette()) {
           $montant = $(namespace + '#nouveau-dette input#somme').val();
           $description = $(namespace + '#nouveau-dette textarea#description').val();
           $date_dette = $(namespace+"#date-dette").val();
           $date_echeance = $(namespace+"#date-echeance").val();
           let trosa = {};
           trosa.clientFournisseur = {id: $cf_id};
           trosa.montant = $montant;
           trosa.description = $description;
           trosa.typeTrosa = "DETTE";
           trosa.date = $date_dette;
           trosa.dateEcheance = $date_echeance;
           trosa.reste = $montant;
           let url = "http://localhost:8080/api/v1/trosas";
           execute_ajax_request("post",url,trosa,(data)=>{
               let tr = ["",
                   trosa.date,
                   trosa.montant,
                   0,
                   trosa.montant,
                   trosa.typePayement,
                   `<span class="badge `+createBadge($montant)+`">`+createStatus($montant)+`</span>`,
                   trosa.dateEcheance,
                   trosa.description,
                   `<a  class="btn-sm btn-danger delete-trosa"><i class="uil-trash-alt"></i></a>
                    <a  class="btn-sm btn-infos payer-trosa"><i class="uil-money-withdrawal"></i></a>`];
               push_to_table_list(namespace + '#table-dette-cf',data.id,tr);
               createToast('bg-success', 'uil-check-sign', 'Dette enregistre', 'Nouveau dette enregistre avec success!');
               $(namespace + '#nouveau-dette input').val('');
               $(namespace + '#nouveau-dette textarea').val('');
           })
           $(namespace + '#nouveau-dette').modal('hide');
       }
    })
    /*
    Supprimer dette
     */
    $(namespace + '.btn-supprimer-dette').on('click', function () {
        $modalId = "suppression-dette-fournisseur"
        create_confirm_dialog('Suppression dette', 'Voulez vraiment supprimer les dettes impayes ?', $modalId, 'Oui, supprimer tout', 'btn-danger')
            .on('click', function() {
                $(namespace + '.table-dette-fournisseur tbody tr').remove();
                hideAndRemove('#' + $modalId);
                createToast('bg-danger', 'uil-check-sign', 'Dette supprime', 'Tout les dettes fournisseur sont supprimer avec success!');
            })
    })
    /*
    *  DOUBLE CLICK TR
    * */
    const createStatus = (montant)=>{
        if (montant===0) return "payé";
        else return "non payé";
    }

    const createBadge = (montant)=>{
        if (montant===0) return "badge badge-success-lighten";
        else return "badge badge-warning-lighten";
    }

    const init_action_column = (reste)=>{
       let action =  `<a  class="btn-sm btn-danger delete-trosa"><i class="uil-trash-alt"></i></a>`;
       return reste === 0 ? action : action+`<a  class="btn-sm btn-info payer-trosa"><i class="uil-money-withdrawal"></i></a>`;
    }

    function appendItem(data) {
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
            push_to_table_list(namespace + '#table-dette-cf', value.id, tr);
        })
    }

    function fetch_data(){
        let url = "http://localhost:8080/api/v1/trosas/cf/" + $cf_id;
        execute_ajax_request("get", url, null, (data) => appendItem(data))
    }

    $(document).on('dblclick',namespace + '#table-fournisseur tbody tr',function(){
        $(namespace+"#info-dette-cf").modal("show");
        $cf_id = $(this).attr("id");
        fetch_data();
    })
    // payement trosa
    let montantReste = 0;

    push_Type_paiement(namespace + '#modal-payement-dette #type-paiement')

    $(document).on('click', namespace + '#table-dette-cf .payer-trosa',function(){
        $trosa_id = $(this).closest("tr").attr("id");
        // get montant
        $montant_reste = parseFloat($(this).closest('tr').children('td').eq(4).text());
        $(namespace + '#modal-payement-dette form').validate();
        $(namespace + '#modal-payement-dette input#Montant-payer').val($montant_reste)
        $(namespace + '#modal-payement-dette').modal('show')
    })

    /*
    validation payement
     */

    $(namespace + '#modal-payement-dette form').validate( {
        rules : {
            montantPayer : { required : true, min : 0.0001, max : 10000000},
            typePayement : {required :true}
        },
        messages : {
            montantPayer : { required : "Montant payer requis", min : "Montant payer doit être >0", max : "Le montant depasse le dette"},
            typePayement : {required : "Type de payement required"}
        }
    })

    function validation_payement_dette() {
        $(namespace + '#modal-payement-dette form').validate();
        return $(namespace + '#modal-payement-dette form').valid();
    }

    $(namespace+"#refresh-list-btn").click(()=> fetch_data())

    function update_reste(montant_payer) {
        let montant_reste = $montant_reste - parseFloat(montant_payer);
        execute_ajax_request("put", "http://localhost:8080/api/v1/trosas/" + $trosa_id, montant_reste, (data) => {
            $(namespace + '#modal-payement-dette').modal('hide');
            createToast('bg-success', 'uil-check', 'Dette payé', 'Dette payé avec succès');
        });
    }

    $(namespace + '#modal-payement-dette .btn-enregistrer-payement-dette').on('click',function(){
        if (validation_payement_dette()){
            let montant_payer = $(namespace+"#Montant-payer").val();
            let type_payement = $(namespace+"#type-paiement option:selected").val();
            let description = $(namespace+"#description-payement").val();
            let ifc = {};
            ifc.description = description;
            ifc.montantOperation = montant_payer;
            ifc.reference = "ref";
            ifc.operationCaisse = "ENCAISSEMENT";
            ifc.user = {id:$user_id};
            ifc.modePayement = type_payement;
            ifc.filiale = {id:$filialeId};
            ifc.date = new Date();
            let url = "http://localhost:8080/api/v1/ifc";
            execute_ajax_request("post",url,ifc,(data)=>{
                update_reste(montant_payer);
            });
        }
    })

})