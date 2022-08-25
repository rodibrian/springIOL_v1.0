package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeOperationCaisse;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class InfoFilialeCaisse{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "filiale_id")
    private Filiale filiale;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinTable(name = "info_caisse_magasin",
            foreignKey =@ForeignKey(name = "FK_MAGASIN_ID",foreignKeyDefinition = "FOREIGN KEY (magasin_id) REFERENCES magasin(id_magasin) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Magasin magasin;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private TypeOperationCaisse operationCaisse;

    @Enumerated(EnumType.STRING)
    private ModePayement modePayement;

    @Column(columnDefinition = "TEXT")
    private String reference;

    private LocalDate date;

    private String description;

    private Double montantOperation;
}
