-- we don't know how to generate root <with-no-name> (class Root) :(
create table info_article
(
    magasin_receveur bigint not null,
    magasin_id bigint not null,
    prix_achat double precision,
    prix_vente double precision,
    quantite double precision,
    constraint info_article_pkey
        primary key (magasin_receveur, magasin_id)
);

alter table info_article owner to postgres;

create table societe
(
    slogan text,
    verset text,
    id bigint not null
        constraint societe_pkey
            primary key
);

alter table societe owner to postgres;

create table utilisateur_magasin
(
    magasin_id bigint,
    user_id bigint not null
        constraint utilisateur_magasin_pkey
            primary key
);

alter table utilisateur_magasin owner to postgres;

create table voyage_article
(
    id bigserial not null
        constraint voyage_article_pkey
            primary key,
    date timestamp,
    quantite double precision,
    article_id bigint,
    user_id bigint,
    voyage_id bigint
);

alter table voyage_article owner to postgres;

create table categorie
(
    id bigserial not null
        constraint categorie_pkey
            primary key,
    libelle text
);

alter table categorie owner to postgres;

create table article
(
    article_id bigserial not null
        constraint article_pkey
            primary key,
    date_peremption date,
    designation text,
    image oid,
    status varchar(15),
    categorie_id bigint
        constraint article_categorie_key_constraint
            references categorie
);

alter table article owner to postgres;

create table fonction
(
    id bigserial not null
        constraint fonction_pkey
            primary key,
    code text,
    nom text
);

alter table fonction owner to postgres;

create table fonctionnalite
(
    id bigserial not null
        constraint fonctionnalite_pkey
            primary key,
    nom text
);

alter table fonctionnalite owner to postgres;

create table fonction_fonctionnalite
(
    fonction_id bigint not null
        constraint ff_fonction_key_constraint
            references fonction,
    fonctionnalite_id bigint not null
        constraint ff_fonctionnalite_key_constraint
            references fonctionnalite,
    constraint fonction_fonctionnalite_pkey
        primary key (fonction_id, fonctionnalite_id)
);

alter table fonction_fonctionnalite owner to postgres;

create table operation
(
    id bigserial not null
        constraint operation_pkey
            primary key,
    type_operation text
);

alter table operation owner to postgres;

create table operation_caisse
(
    id bigint not null,
    date timestamp,
    montant double precision,
    operation_caisse integer,
    opp_caisse_id bigint
        constraint fklovcf21o2finbias5vh3q596d
            references operation_caisse,
    operation_id bigserial not null
        constraint operation_caisse_pkey
            primary key
        constraint fken4dmxn77qi32ke7wopluxu1d
            references operation
);

alter table operation_caisse owner to postgres;

create table personne
(
    id bigserial not null
        constraint personne_pkey
            primary key,
    adresse text,
    email text,
    nom text,
    num_tel text,
    photo oid
);

alter table personne owner to postgres;

create table client_fournisseur
(
    cif text,
    nif text,
    rcs text,
    stat text,
    id bigint not null
        constraint client_fournisseur_pkey
            primary key
        constraint fkfofmm3l4qkmi4k9sl1nt2h3x0
            references personne
);

alter table client_fournisseur owner to postgres;

create table filiale
(
    id bigint not null
        constraint filiale_pkey
            primary key
        constraint fkf9jvt24bbipxisi457rl2hpl7
            references personne
);

alter table filiale owner to postgres;

create table magasin
(
    id_magasin bigserial not null
        constraint magasin_pkey
            primary key,
    adresse text,
    nom_magasin text,
    societe_id bigint
        constraint magasin_societe_key_constraint
            references filiale
);

alter table magasin owner to postgres;

create table info_article_magasin
(
    article_id bigint not null
        constraint infoam_article_key_constraint
            references article,
    magasin_id bigint not null
        constraint infoam_key_constraint
            references magasin,
    quantite_stock double precision,
    constraint info_article_magasin_pkey
        primary key (article_id, magasin_id)
);

alter table info_article_magasin owner to postgres;

create table magasin_article
(
    magasin_id bigint not null
        constraint mag_article_magasin_key_constraint
            references magasin,
    article_id bigint not null
        constraint mag_art_article_key_constraint
            references article,
    constraint magasin_article_pkey
        primary key (magasin_id, article_id)
);

alter table magasin_article owner to postgres;

create table magasin_operations
(
    magasin_id_magasin bigint not null
        constraint fk9qjbeno0tsnqluxh0y0vycpi
            references magasin,
    operations_id bigint not null
        constraint uk_1yw1rjphpabhg85mdktor1wfm
            unique
        constraint fkjaaj7024w1opdtntw2gsy07o9
            references operation,
    constraint magasin_operations_pkey
        primary key (magasin_id_magasin, operations_id)
);

alter table magasin_operations owner to postgres;

create table personne_physique
(
    cin text,
    date_delivrance date,
    lieu_delivrance text,
    sexe varchar(255),
    situation_matrimoniale varchar(255),
    id bigint not null
        constraint personne_physique_pkey
            primary key
        constraint fkdntqhp735wc4j2lt9wd0es7gc
            references personne
);

alter table personne_physique owner to postgres;

create table _user
(
    password text not null,
    username text not null,
    id bigint not null
        constraint _user_pkey
            primary key
        constraint fk378jh9bywdkcmkkcx2pujjplp
            references personne_physique,
    fonction_id bigint
        constraint user_fonction_key_constraint
            references fonction
);

alter table _user owner to postgres;

create table approv
(
    id bigserial not null
        constraint approv_pkey
            primary key,
    date_echeance date,
    mode_payement varchar(50),
    montant_approvisionnement double precision,
    montant_transport double precision,
    paye_caisse boolean,
    ref_facture text,
    fournisseur_id bigint
        constraint approv_fournisseur_key_constraint
            references client_fournisseur,
    magasin_id bigint
        constraint approv_magasin_constraint
            references magasin,
    user_id bigint
        constraint approv_user_key_constraint
            references _user
);

alter table approv owner to postgres;

create table approv_article
(
    approv_id bigint not null
        constraint appart_approv_key_constraint
            references approv,
    article_id bigint not null
        constraint appart_article_key_constraint
            references article,
    date_peremption timestamp,
    prix_achat double precision,
    quantite double precision,
    constraint approv_article_pkey
        primary key (approv_id, article_id)
);

alter table approv_article owner to postgres;

create table approvisionnement_article
(
    approv_id bigint not null
        constraint approv_article_approv_id_constraint
            references approv,
    article_id bigint not null
        constraint uk_khvt7957hxyfgxd4lfump4pnf
            unique
        constraint approv_art_article_id_constraint
            references article,
    constraint approvisionnement_article_pkey
        primary key (approv_id, article_id)
);

alter table approvisionnement_article owner to postgres;

create table materiel_transport
(
    id bigserial not null
        constraint materiel_transport_pkey
            primary key,
    reference text,
    type_materiel text,
    responsable_id bigint
        constraint mat_trans_responsable_key_constraint
            references personne_physique
);

alter table materiel_transport owner to postgres;

create table operation_approv
(
    approv_id bigint
        constraint fk3ucbyhvefqytueuu716gok1tv
            references approv,
    operation_id bigint not null
        constraint operation_approv_pkey
            primary key
        constraint fkc9evvpicvild4g55esy9wgixn
            references operation
);

alter table operation_approv owner to postgres;

create table prix_article_magasin
(
    article_id bigint not null
        constraint pam_article_key_constraint
            references article,
    magasin_id bigint not null
        constraint pam_key_constraint
            references magasin,
    date_enregistrement date,
    montant double precision,
    user_id bigint
        constraint pam_user_key_constraint
            references _user,
    constraint prix_article_magasin_pkey
        primary key (article_id, magasin_id)
);

alter table prix_article_magasin owner to postgres;

create table responsable_magasin
(
    responsable_id bigint
        constraint fkdmrb7yp0njycip4gtsx2839n0
            references _user,
    magasin_id bigint not null
        constraint responsable_magasin_pkey
            primary key
        constraint fkn8dvos4wvlwdjmsdfu9wy4pa0
            references magasin
);

alter table responsable_magasin owner to postgres;

create table transfert
(
    id bigserial not null
        constraint transfert_pkey
            primary key,
    code_transfert text,
    date_transfert date,
    designation text,
    num_bon_transfert text,
    magasin_origine bigint
        constraint transfert_magasin_origine_key_constraint
            references magasin,
    magasin_receveur bigint
        constraint transfert_magasin_receveur_key_constraint
            references magasin,
    user_id bigint
        constraint transfert_utilisateur_key_constraint
            references _user
);

alter table transfert owner to postgres;

create table transfert_article
(
    article_id bigint not null
        constraint ta_article_key_constraint
            references article,
    transfert_id bigint not null
        constraint ta_transfert_key_constraint
            references transfert,
    date timestamp,
    quantite double precision,
    constraint transfert_article_pkey
        primary key (article_id, transfert_id)
);

alter table transfert_article owner to postgres;

create table unite
(
    id bigserial not null
        constraint unite_pkey
            primary key,
    code text,
    designation text,
    niveau integer not null,
    poids double precision,
    prix double precision,
    quantite double precision
);

alter table unite owner to postgres;

create table article_unite
(
    article_id bigint not null
        constraint au_article
            references article,
    unite_id bigint not null
        constraint uk_tnnrgpgb1efrv22krspkej7ge
            unique
        constraint au_unite
            references unite,
    constraint article_unite_pkey
        primary key (article_id, unite_id)
);

alter table article_unite owner to postgres;

create table utilisateur_filiale
(
    filiale_id bigint
        constraint fk3yv6x7x4ao8hr6cuoaoutxjuh
            references filiale,
    user_id bigint not null
        constraint utilisateur_filiale_pkey
            primary key
        constraint fk1ojqqpfg4adosuc24xg9q1i2
            references _user
);

alter table utilisateur_filiale owner to postgres;

create table vente
(
    id bigserial not null
        constraint vente_pkey
            primary key,
    date date,
    date_echeance date,
    montant_reste double precision,
    montant_vente double precision,
    observation text,
    remise double precision,
    vente_client_id bigint
        constraint vente_client_key_constraint
            references client_fournisseur,
    magasin_id bigint
        constraint vente_magasin_key_constraint
            references magasin,
    responsable_id bigint
        constraint vente_responsable_key_constraint
            references _user
);

alter table vente owner to postgres;

create table avoir
(
    id bigserial not null
        constraint avoir_pkey
            primary key,
    date timestamp,
    montant double precision,
    nombre_article integer not null,
    user_id bigint
        constraint avoir_user_key_constraint
            references _user,
    vente_id bigint
        constraint avoir_vente_key_constraint
            references vente
);

alter table avoir owner to postgres;

create table info_vente
(
    article_id bigint not null
        constraint info_vente_article_key_constraint
            references article,
    vente_id bigint not null
        constraint info_vente_vente_key_constraint
            references vente,
    date_vente timestamp,
    prix_vente double precision,
    quantite double precision,
    reference varchar(255),
    constraint info_vente_pkey
        primary key (article_id, vente_id)
);

alter table info_vente owner to postgres;

create table livraison
(
    id bigserial not null
        constraint livraison_pkey
            primary key,
    numero_bon text,
    statut_voyage varchar(255),
    vente_id bigint
        constraint livraison_vente_key_constraint
            references vente
);

alter table livraison owner to postgres;

create table livraison_materiel_transport
(
    mat_trans_id bigint
        constraint fkbhshi8ku04cyvqncbo0mqv4mw
            references materiel_transport,
    livraison_id bigint not null
        constraint livraison_materiel_transport_pkey
            primary key
        constraint fkhq0l73v1wwnhaehguiysr39dn
            references livraison
);

alter table livraison_materiel_transport owner to postgres;

create table operation_vente
(
    vente_id bigint
        constraint fk30fkfyknw66wx6ad5svwilna0
            references vente,
    operation_id bigint not null
        constraint operation_vente_pkey
            primary key
        constraint fkhoyuvjdud67b528c9mt7okp7n
            references operation
);

alter table operation_vente owner to postgres;

create table payement
(
    id bigserial not null
        constraint payement_pkey
            primary key,
    date date,
    mode_payement varchar(50),
    vente_id bigint
        constraint payement_vente_key_constraint
            references vente
);

alter table payement owner to postgres;

create table payement_vente
(
    vente_id bigint not null
        constraint pa_vente_key_constraint
            references vente,
    payement_id bigint not null
        constraint uk_kmqd6cxidt1im6iaqgsh42gcs
            unique
        constraint pa_payement_key_constraint
            references payement,
    constraint payement_vente_pkey
        primary key (vente_id, payement_id)
);

alter table payement_vente owner to postgres;

create table vente_article
(
    vente_id bigint not null
        constraint va_vente_key_constraint
            references vente,
    article_id bigint not null
        constraint va_article_key_constraint
            references article,
    constraint vente_article_pkey
        primary key (vente_id, article_id)
);

alter table vente_article owner to postgres;

create table voyage
(
    id bigserial not null
        constraint voyage_pkey
            primary key,
    reference text,
    statut_voyage varchar(20),
    trajet text,
    voyage varchar(20),
    materiel_de_transport_id bigint
        constraint voyage_materiel_transport_key_contraint
            references materiel_transport
);

alter table voyage owner to postgres;

create table embarquement_article
(
    id bigserial not null
        constraint embarquement_article_pkey
            primary key,
    date timestamp,
    quantite double precision,
    article_id bigint
        constraint ea_article_key_constraint
            references article,
    user_id bigint
        constraint voyage_responsable_key_constraint
            references _user,
    voyage_id bigint
        constraint ea_voyage_key_constraint
            references voyage
);

alter table embarquement_article owner to postgres;

create table voyage_article_fournisseur
(
    fournisseur_id bigint
        constraint fkliq46bnw1ol82h1dadl1hkjni
            references client_fournisseur,
    va_id bigint not null
        constraint voyage_article_fournisseur_pkey
            primary key
        constraint fkeh2o7ims06p0l0ybatyxxxy83
            references embarquement_article
);

alter table voyage_article_fournisseur owner to postgres;

create table voyage_article_magasin
(
    magasin_id bigint
        constraint fkm3q21a6hmx6usjxps4fwroy4t
            references magasin,
    va_id bigint not null
        constraint voyage_article_magasin_pkey
            primary key
        constraint fkjyfq8ygywkh1w58u8v1jykkh4
            references embarquement_article
);

alter table voyage_article_magasin owner to postgres;

