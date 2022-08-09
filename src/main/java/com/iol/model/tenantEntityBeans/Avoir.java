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

    private Double montant;

    @Column(columnDefinition = "TEXT")
    private String refAvoir;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "avoir_info_article_magasin")
    private List<InfoArticleMagasin> infoArticleMagasin;
}
