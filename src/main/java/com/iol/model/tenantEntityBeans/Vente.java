package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.ModePayement;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
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

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "vente_info_article_magasin")
    private List<InfoArticleMagasin> infoArticleMagasin;

    @ManyToOne
    @JoinColumn(name = "client_id",foreignKey = @ForeignKey(name = "FK_CLIENT_ID"))
    private ClientFournisseur client;

    private Double remise;

    @Column
    private Double reste;

    @Column
    private Double montantVente;

    @Column
    private String refVente;

    @Column(length = 50)
    @Enumerated(value = EnumType.STRING)
    private ModePayement modePayement;
}
