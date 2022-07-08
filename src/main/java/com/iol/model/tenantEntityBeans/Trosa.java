package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.TypeTrosa;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Trosa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double montant;
    private LocalDate date;
    private TypeTrosa typeTrosa;

    @OneToOne
    @JoinColumn(name = "filiale_id")
    private Filiale filiale;

    @OneToOne
    @JoinColumn(name = "operation_id")
    private Operation operation;
}
