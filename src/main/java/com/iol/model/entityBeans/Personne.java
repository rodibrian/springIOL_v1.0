package com.iol.model.entityBeans;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String adresse;

    @Column(columnDefinition = "TEXT")
    private String numTel;

    @Column(columnDefinition = "TEXT")
    private String email;

    @Lob
    private byte[] photo;
}
