package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeTrosa;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "trosa")
@Table(name = "trosa")
@Data
public class Trosa{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant;

    private Double reste;

    @Enumerated(EnumType.ORDINAL)
    private TypeTrosa typeTrosa;

    @ManyToOne
    @JoinColumn(name = "cf_id")
    private ClientFournisseur clientFournisseur;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.ORDINAL)
    private  ModePayement modePayement;

    private LocalDate dateEcheance;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String reference;
}
