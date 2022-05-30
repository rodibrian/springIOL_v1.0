package com.iol.model.entityBeans;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name = "transfert")
@Table(name = "transfert")
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "transfert.all",query = "from transfert")
})
public class Transfert implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "magasin_origine",foreignKey = @ForeignKey(name = "transfert_magasin_origine_key_constraint"))
    private Magasin magasinOrigine;

    @ManyToOne
    @JoinColumn(name = "magasin_receveur",foreignKey = @ForeignKey(name = "transfert_magasin_receveur_key_constraint"))
    private Magasin magasinReceveur;

    @ManyToOne
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "transfert_utilisateur_key_constraint"))
    private User user;

    @Column(columnDefinition = "TEXT")
    private String codeTransfert;

    @Temporal(TemporalType.DATE)
    private Date dateTransfert;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @Column(columnDefinition = "TEXT")
    private String numBonTransfert;
}
