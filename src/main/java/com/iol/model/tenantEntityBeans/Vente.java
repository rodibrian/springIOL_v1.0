package com.iol.model.entityBeans;

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
@DynamicUpdate
@DynamicInsert
public class Vente implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(name = "vente_article",
            joinColumns = {@JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "va_vente_key_constraint"))},
    inverseJoinColumns = {@JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "va_article_key_constraint"))})
    private Set<Article> articles;

    @OneToMany
    @JoinTable(name = "payement_vente",
            joinColumns = {@JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "pa_vente_key_constraint"))},
            inverseJoinColumns = {@JoinColumn(name = "payement_id",foreignKey = @ForeignKey(name = "pa_payement_key_constraint"))})
    private Set<Payement> payements;

    @ManyToOne
    @JoinColumn(name = "vente_client_id",foreignKey = @ForeignKey(name = "vente_client_key_constraint"))
    private ClientFournisseur client;

    @ManyToOne
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "vente_magasin_key_constraint"))
    private Magasin magasin;

    @ManyToOne
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
