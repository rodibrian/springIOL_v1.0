package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.TypeCf;
import lombok.Data;
import org.hibernate.annotations.CollectionId;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class ClientFournisseur extends Personne{
    @Enumerated(EnumType.ORDINAL)
    private TypeCf typeCf;
    @OneToMany
    private Set<Trosa> Trosas;

    @Transient
    private Double totalMontantTrosa;

    @PostLoad
    public void TotalMontantTrosa(){
       setTotalMontantTrosa(getTrosas().stream().mapToDouble(Trosa::getMontant).sum());
    }
}
