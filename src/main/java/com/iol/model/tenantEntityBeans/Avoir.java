package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table
@Data
@NoArgsConstructor
public class Avoir{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "avoir_vente_key_constraint"))
    private Vente vente;

    @ManyToOne
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "avoir_user_key_constraint"))
    private User user;

    private Double montant;

    private int nombreArticle;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
