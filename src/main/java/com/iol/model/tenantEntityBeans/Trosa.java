package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.TypeTrosa;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "trosa")
@Table(name = "trosa")
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
    @JoinTable(name = "trosa_operation",
            joinColumns = {@JoinColumn(name = "trosa_id",foreignKey = @ForeignKey(name ="FK_TROSA_ID",foreignKeyDefinition = "foreign key (trosa_id) references trosa(id) on delete cascade"))},
            inverseJoinColumns = {@JoinColumn(name = "operation_id",foreignKey = @ForeignKey(name = "FK_OPERATION_ID",foreignKeyDefinition = "foreign key (operation_id) references operation(id) on delete cascade"))})
    private Operation operation;
}
