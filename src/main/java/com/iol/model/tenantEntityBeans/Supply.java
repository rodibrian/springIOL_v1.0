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
public class Supply extends Operation implements Serializable{
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne(cascade = CascadeType.MERGE)
   @JoinColumn(name = "fournisseur_id")
   private ClientFournisseur fournisseur;

   private Double montant;

   private LocalDate datePeremption;

   @Column(columnDefinition = "TEXT")
   private String refFacture;
}
