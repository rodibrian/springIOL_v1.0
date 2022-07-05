package com.iol.model.entityBeans;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Data
@DynamicUpdate
@DynamicInsert
public class ClientFournisseur extends Personne{
    @Column(columnDefinition = "TEXT")
    private String nif;
    @Column(columnDefinition = "TEXT")
    private String stat;
    @Column(columnDefinition = "TEXT")
    private String cif;
    @Column(columnDefinition = "TEXT")
    private String rcs;
}
