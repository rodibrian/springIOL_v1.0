package com.iol.model.tenantEntityBeans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.function.ToDoubleFunction;

@Entity
@Data
public class ClientFournisseur extends Personne{

    private int type;

    @JsonIgnore
    @OneToMany(mappedBy = "clientFournisseur")
    private List<Trosa> Trosas;

    @Transient
    private Double totalMontantTrosa;

    @PostLoad
    public void TotalMontantTrosa(){
       setTotalMontantTrosa(getTrosas().stream().mapToDouble(value -> value.getReste()).sum());
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "filiale_id",nullable = false)
    private Filiale filiale;
}
