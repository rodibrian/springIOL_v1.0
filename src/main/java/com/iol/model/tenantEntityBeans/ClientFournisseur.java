package com.iol.model.tenantEntityBeans;

import lombok.Data;
import javax.persistence.*;
import java.util.Set;
@Entity
@Data
public class ClientFournisseur extends Personne{

    private int type;

    @OneToMany
    private Set<Trosa> Trosas;

    @Transient
    private Double totalMontantTrosa;

    @PostLoad
    public void TotalMontantTrosa(){
       setTotalMontantTrosa(getTrosas().stream().mapToDouble(Trosa::getMontant).sum());
    }
}
