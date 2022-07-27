package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.ModePayement;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity(name = "approv")
@Table(name = "approv")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "approv.all",query = "from approv")
})
public class Supply implements Serializable{
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne(cascade = CascadeType.MERGE)
   @JoinColumn(name = "fournisseur_id")
   private ClientFournisseur fournisseur;

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

   private Double quantite;

   @Column(columnDefinition = "TEXT")
   private String reference;

   @Column(columnDefinition = "TEXT")
   private String description;

   private Double montantApprov;

   private LocalDate datePeremption;

   private LocalDate dateApprov;

   @Column(columnDefinition = "TEXT")
   private String refFacture;
}
