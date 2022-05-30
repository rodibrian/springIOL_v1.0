package com.iol.model.entityBeans;
import com.iol.model.entityEnum.ModePayement;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Payement{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    @Enumerated(value = EnumType.STRING)
    private ModePayement modePayement;

    @ManyToOne
    @JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "payement_vente_key_constraint"))
    private Vente vente;

    @Temporal(TemporalType.DATE)
    private Date date;
}
