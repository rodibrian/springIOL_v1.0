package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "categorie")
@Table(name = "categorie")
@Data
@NoArgsConstructor
public class Categorie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String libelle;

    public Categorie(String libelle) {
        this.libelle = libelle;
    }
}
