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
   @JoinColumn(name = "magasin_id",foreignKey =@ForeignKey(name = "approv_magasin_constraint"))
   private Magasin magasin;

   @ManyToOne(cascade = CascadeType.MERGE)
   @JoinColumn(name = "fournisseur_id",foreignKey =@ForeignKey(name = "approv_fournisseur_key_constraint"))
   private ClientFournisseur fournisseur;

   @OneToOne(cascade = CascadeType.ALL,mappedBy = "supply")
   private InfoArticleMagasin infoArticleMagasin;

   @ManyToOne(cascade = CascadeType.MERGE)
   @JoinColumn(name = "user_id",foreignKey =@ForeignKey(name = "approv_user_key_constraint"))
   private User user;

   private Double montantApprov;

   private LocalDate date;

   @Column(columnDefinition = "TEXT")
   private String refFacture;
}
