package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity(name = "vente")
@Table(name = "vente")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "vente.all",query = "from vente")
})
public class Vente implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "vente_article",
//            joinColumns = {@JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "va_vente_key_constraint"))},
//    inverseJoinColumns = {@JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "va_article_key_constraint"))})
//    private Set<Article> articles;

    @ManyToOne
    private Article article;

    @ManyToOne
    private Unite unite;

    @ManyToOne
    @JoinColumn(name = "vente_client_id",foreignKey = @ForeignKey(name = "vente_client_key_constraint"))
    private ClientFournisseur client;

    @OneToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "payement_vente",
            joinColumns = {@JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "pa_vente_key_constraint"))},
            inverseJoinColumns = {@JoinColumn(name = "payement_id",foreignKey = @ForeignKey(name = "pa_payement_key_constraint"))})
    private Set<Payement> payements;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "vente_magasin_key_constraint"))
    private Magasin magasin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "responsable_id",foreignKey = @ForeignKey(name = "vente_responsable_key_constraint"))
    private User user;

    @OneToOne(mappedBy = "vente")
    private Avoir avoir;

    private Double remise;

    @Column
    private Double montantVente;

    @Column
    private Double montantReste;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Temporal(TemporalType.DATE)
    private Date dateEcheance;

    @Column(columnDefinition = "TEXT")
    private String observation;
}
