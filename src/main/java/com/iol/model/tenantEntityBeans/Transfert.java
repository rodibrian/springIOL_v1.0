package com.iol.model.tenantEntityBeans;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
public class Transfert extends OperationData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "magasin_origine",foreignKey = @ForeignKey(name = "transfert_magasin_origine_key_constraint"))
    private Magasin magasinOrigine;

    @ManyToOne
    @JoinColumn(name = "magasin_receveur",foreignKey = @ForeignKey(name = "transfert_magasin_receveur_key_constraint"))
    private Magasin magasinReceveur;

    @Column(columnDefinition = "TEXT")
    private String codeTransfert;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @Column(columnDefinition = "TEXT")
    private String numBonTransfert;
}
