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
public class Vente extends Operation implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id",foreignKey = @ForeignKey(name = "FK_CLIENT_ID"))
    private ClientFournisseur client;

    private Double remise;

    @Column(columnDefinition = "TEXT")
    private String reference;

    @Column
    private Double montantVente;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String observation;
}
