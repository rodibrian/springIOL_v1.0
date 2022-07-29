$(function () {

    /*--------------------------

            MENU CAISSE

     --------------------------*/

    let namespace = "#menu-caisse ";
    exportToExcel(namespace + '.btn-export-to-excel','caisse', namespace + '.table-liste-operation-caisse')


    // mode de paiement

    const ESPECE = "espece", CHEQUE = "cheque", CREDIT = "credit", VIREMENT = "virement";

    // type operation

    const OP_FACTURE = $(namespace + "#caisse-facture").attr('value-filter'),
        OP_DEPENSE = $(namespace + "#caisse-depense").attr('value-filter'),
        OP_RECETTE = $(namespace + "#caisse-recette").attr('value-filter'),
        OP_AVOIR = $(namespace + "#caisse-avoir").attr('value-filter'),
        OP_CREDIT = $(namespace + "#caisse-credit").attr('value-filter');
        OP_CONSO = $(namespace + "#caisse-consommation").attr('value-filter');

    // type operation

    const OP_IN = "entree", OP_OUT = "sortie";

    $(namespace + '#btn-creer-encaissement').attr('type-id', OP_IN);
    $(namespace + '#btn-creer-decaissement').attr('type-id', OP_OUT);

    $lesMagasins = [
        {
            code: "M1", libelle: "Magasin A"
        },
        {
            code: "M2", libelle: "Magasin B"
        }
    ];

    $lesFactures = [
        {
            reference: "F-123", date: new Date().toLocaleDateString(), montant: 50000, modeDePaiement: ESPECE
        },
        {
            reference: "F-456", date: new Date().toLocaleDateString(), montant: 10000, modeDePaiement: CHEQUE
        },
        {
            reference: "F-789", date: new Date().toLocaleDateString(), montant: 5000, modeDePaiement: CREDIT
        },
        {
            reference: "F-321", date: new Date().toLocaleDateString(), montant: 9500, modeDePaiement: ESPECE
        },
        {
            reference: "F-654", date: new Date().toLocaleDateString(), montant: 80000, modeDePaiement: VIREMENT
        },
        {
            reference: "F-987", date: new Date().toLocaleDateString(), montant: 1000, modeDePaiement: CREDIT
        },
        {
            reference: "F-213", date: new Date().toLocaleDateString(), montant: 7500, modeDePaiement: ESPECE
        }
    ]

    $lesOperationCaisse = [
        {
            reference: "Oe-123",
            type: OP_IN,
            date: new Date().toLocaleDateString(),
            montant: 15000,
            motif: "Aucun motif d'encaissement"
        },
        {
            reference: "Od-456",
            type: OP_OUT,
            date: new Date().toLocaleDateString(),
            montant: 5000,
            motif: "Aucun motif de decaissement"
        }
    ]

    $lesAvoirs = [
        {
            reference: "A-123", date: new Date().toLocaleDateString(), libelle: "Avoir du facture ...", montant: 79000
        },
        {
            reference: "A-456", date: new Date().toLocaleDateString(), libelle: "Avoir du facture ...", montant: 15000
        }
    ]

    /*
     ajout dans la table listes operation
     */

    $.each($lesFactures, function (key, value) {

        push_to_table_list(
            namespace + ".table-liste-operation-caisse",
            value.reference,
            [OP_FACTURE, value.date, value.reference, "Achat articles non identifies", value.montant, "", value.modeDePaiement]
        )
            .attr('data-filter', [OP_FACTURE, value.modeDePaiement]);
    })

    $.each($lesOperationCaisse, function (key, value) {

        push_to_table_list(
            namespace + ".table-liste-operation-caisse",
            value.reference,
            [value.type === OP_IN ? OP_RECETTE : OP_DEPENSE, value.date, value.reference, "Operation caisse non definis", value.type === OP_IN ? value.montant : "", value.type === OP_OUT ? value.montant : "", ""]
        )
            .attr('data-filter', [ESPECE, value.type === OP_IN ? OP_RECETTE : OP_DEPENSE])
    })

    $.each($lesAvoirs, function (key, value) {

        push_to_table_list(
            namespace + ".table-liste-operation-caisse",
            value.reference,
            [OP_AVOIR, value.date, value.reference, value.libelle, "", value.montant, ""]
        )
            .attr('data-filter', [OP_AVOIR, ESPECE])
    })

    /*
     OPERATION CAISSE
     */

    $(namespace + '#btn-creer-encaissement, #btn-creer-decaissement').on('click', function () {

        $typeOperation = $(this).attr('type-id');

        switch ($typeOperation) {
            case OP_IN :
                $("#operation-caisse .label-title").text("Encaissement");
                break;
            case OP_OUT:
                $("#operation-caisse .label-title").text("Decaissement");
                break;
        }
    })

    /*
     enregistrement operation
     */

    $("#operation-caisse #btn-enregistrer-operation-caisse").on('click', function () {

        switch ($typeOperation) {
            case OP_IN :
                push_to_table_list(
                    namespace + ".table-liste-operation-caisse",
                    "",
                    [OP_RECETTE,
                        new Date().toLocaleDateString(),
                        $('#operation-caisse #input-reference').val(),
                        '[' + $('#operation-caisse #input-categorie').val() + '] ' + $('#operation-caisse #area-description').val(),
                        $('#operation-caisse #input-montant').val(),
                        "-",
                        "-"]
                )
                    .attr('data-filter', [OP_RECETTE, ESPECE])
                createToast('bg-success', 'uil-folder-check', 'Encaissement enregistre', 'ENcaissement enregistrer avec success!');
                impression_EncDecAissement(true)
            break;
            case OP_OUT :
                push_to_table_list(
                    namespace + ".table-liste-operation-caisse",
                    "",
                    [OP_DEPENSE,
                        new Date().toLocaleDateString(),
                        $('#operation-caisse #input-reference').val(),
                        '[' + $('#operation-caisse #input-categorie').val() + '] ' + $('#operation-caisse #area-description').val(),
                        "-",
                        $('#operation-caisse #input-montant').val(),
                        "-"]
                )
                    .attr('data-filter', [OP_DEPENSE, OP_CONSO])
                createToast('bg-warning', 'uil-folder-check', 'Decaissement enregistre', 'Decaissement enregistrer avec success!');
                impression_EncDecAissement(false)
                break;

        }

        // vider les champs

        $('#operation-caisse #input-reference').val('');
        $('#operation-caisse #input-montant').val(0);
        $('#operation-caisse #area-description').val('');
        $('#operation-caisse #input-categorie').val('');

    })

    /*
     evenement des types
     */

    $(namespace + ".type-caisse").on('click', function () {

        filter_table(namespace + ".table-liste-operation-caisse", "value-filter", $(this).attr('value-filter'));

    })

    /*
     function filter table
     */

    function filter_table($idtable, $attr, $value_filter) {

        $table = $($idtable + " tbody tr");
        $table.hide();

        $.each($table, function (key, value) {
            let attr = $(value).attr('data-filter')
            if (attr.search($value_filter) > -1)
                $(this).show();
        })
    }

    /*

    facturation

     */

    function impression_EncDecAissement($isEnc) {
        generer_ticket_EncDecAissement($isEnc);
        generer_facture_EncDecAissement($isEnc);
    }

    function generer_ticket_EncDecAissement($isEnc) {
        let space = namespace + '#impression-ticket-encaissement-ou-decaissement ';

        // receuille des données

        $title = $isEnc ? 'Encaissement' : 'Decaissement';
        $reference = $(namespace + '#operation-caisse #input-reference').val();
        $categorie = $(namespace + '#operation-caisse #input-categorie').val();
        $montant = $(namespace + '#operation-caisse #input-montant').val();
        $description = $(namespace + '#operation-caisse #area-description').val();

        // affectation

        $(space + '.label-title').text($title)
        $(space + '.label-reference').text($reference)
        $(space + '.label-motif').text('[' + $categorie + '] ' + $description)
        $(space + '.label-montant').text($montant + 'Ar')

        $(space).printThis()

    }

    function generer_facture_EncDecAissement($isEnc) {
        let space = namespace + '#impression-facture-encaissement-ou-decaissement ';

        // receuille des données

        $title = $isEnc ? 'Encaissement' : 'Decaissement';
        $reference = $(namespace + '#operation-caisse #input-reference').val();
        $categorie = $(namespace + '#operation-caisse #input-categorie').val();
        $montant = $(namespace + '#operation-caisse #input-montant').val();
        $description = $(namespace + '#operation-caisse #area-description').val();

        // affectation

        $(space + '.label-title').text($title)
        $(space + '.label-reference').text($reference)
        $(space + '.td-reference').text($reference)
        $(space + '.td-description').text('[' + $categorie + '] ' + $description)
        $(space + '.td-montant').text($montant + 'Ar')

        $(space).printThis()

    }



})