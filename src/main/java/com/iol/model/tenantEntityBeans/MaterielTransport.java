package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class MaterielTransport implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "societe_id",foreignKey = @ForeignKey(name = "mat_trans_societe_key_constraint"))
//    private Filiale filiale;

    @OneToMany(mappedBy = "materielTransport")
    private Set<Voyage> voyages;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "responsable_id",foreignKey = @ForeignKey(name = "mat_trans_responsable_key_constraint"))
    private PersonnePhysique personnePhysique;

    @Column(columnDefinition = "TEXT")
    private String typeMateriel;

    @Column(columnDefinition = "TEXT")
    private String reference;
}
