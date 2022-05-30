package com.iol.model.entityBeans;

import com.iol.model.entityEnum.ModePayement;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity(name = "approv")
@Table(name = "approv")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "approv.all",query = "from approv")
})
public class Approvisionnement implements Serializable {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne
   @JoinColumn(name = "magasin_id",foreignKey =@ForeignKey(name = "approv_magasin_constraint"))
   private Magasin magasin;

   @ManyToOne
   @JoinColumn(name = "fournisseur_id",foreignKey =@ForeignKey(name = "approv_fournisseur_key_constraint"))
   private ClientFournisseur fournisseur;

   @OneToMany
   @JoinTable(name = "approvisionnement_article",joinColumns = {@JoinColumn(name = "approv_id",foreignKey = @ForeignKey(name = "approv_article_approv_id_constraint"))},
   inverseJoinColumns = {@JoinColumn(name = "article_id",foreignKey = @ForeignKey(name ="approv_art_article_id_constraint"))})
   private Set<Article> articles;


   @ManyToOne
   @JoinColumn(name = "user_id",foreignKey =@ForeignKey(name = "approv_user_key_constraint"))
   private User user;

   @Temporal(TemporalType.DATE)
   private Date dateEcheance;

   @Enumerated(EnumType.STRING)
   @Column(length = 50)
   private ModePayement modePayement;

   private Double montantTransport;

   private Boolean payeCaisse;

   private Double montantApprovisionnement;

   @Column(columnDefinition = "TEXT")
   private String refFacture;
}
