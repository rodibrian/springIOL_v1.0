package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
public class Avoir{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "avoir_vente_key_constraint"))
    private Vente vente;

    private int nombreArticle;

    private Double montant;

    @OneToOne(cascade = CascadeType.PERSIST)
    private InfoArticleMagasin infoArticleMagasin;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
