package com.iol.model.tenantEntityBeans;
import com.iol.model.entityEnum.Sexe;
import com.iol.model.entityEnum.SituationMatrimoniale;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "personne_physique")
public abstract class PersonnePhysique extends Personne implements Serializable {
    @Column(columnDefinition = "TEXT")
    private String cin;

    @Column(columnDefinition = "TEXT")
    private String lieuDelivrance;

    @Temporal(TemporalType.DATE)
    private Date dateDelivrance;

    @Enumerated(EnumType.STRING)
    private Sexe sexe;

    @Enumerated(EnumType.STRING)
    private SituationMatrimoniale situationMatrimoniale;
}
