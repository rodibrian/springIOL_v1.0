package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "FK_MAGASIN_ID",foreignKeyDefinition = "FOREIGN KEY (magasin_id) REFERENCES magasin(id_magasin) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Magasin magasin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_ARTICLE_ID",foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "unite_id",foreignKey = @ForeignKey(name = "FK_UNITE_ID",foreignKeyDefinition = "FOREIGN KEY (unite_id) REFERENCES unite(id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Unite unite;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "client_id",foreignKey = @ForeignKey(name = "FK_CLIENT_ID"))
    private ClientFournisseur client;

    private Double remise;

    @Column(columnDefinition = "TEXT")
    private String reference;

    private Double quantite;

    private LocalDate date;

    @Column
    private Double montantVente;

    @Column(columnDefinition = "TEXT")
    private String observation;
}
