package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEnum.ModePayement;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Caisse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "filiale_id")
    private Filiale filiale;

    private Double value;

    @Enumerated(EnumType.STRING)
    private ModePayement modePayement;
}
