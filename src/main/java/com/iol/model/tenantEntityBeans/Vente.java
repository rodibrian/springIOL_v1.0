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

    @ManyToOne
    @JoinColumn(name = "article_id",
            foreignKey = @ForeignKey(name = "FK_ARTICLE_ID"
                    ,foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    @ManyToOne
    @JoinColumn(name = "unite_id",
    foreignKey = @ForeignKey(name = "FK_UNITE_ID"
            ,foreignKeyDefinition = "FOREIGN KEY (unite_id) REFERENCES unite(id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Unite unite;

    @ManyToOne
    @JoinColumn(name = "client_id",foreignKey = @ForeignKey(name = "FK_CLIENT_ID"))
    private ClientFournisseur client;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "vente_magasin_key_constraint"))
    private Magasin magasin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "responsable_id",foreignKey = @ForeignKey(name = "vente_responsable_key_constraint"))
    private User user;

    private Double remise;

    private Double quantite;

    @Column(columnDefinition = "TEXT")
    private String reference;

    @Column
    private Double montantVente;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(columnDefinition = "TEXT")
    private String observation;
}
