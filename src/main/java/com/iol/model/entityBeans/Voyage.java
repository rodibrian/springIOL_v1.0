package com.iol.model.entityBeans;

import com.iol.model.entityEnum.StatutVoyage;
import com.iol.model.entityEnum.TypeVoyage;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "voyage")
@Table(name = "voyage")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "voyage.all",query="from voyage")
})
public class Voyage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "materiel_de_transport_id",foreignKey = @ForeignKey(name = "voyage_materiel_transport_key_contraint"))
    private MaterielTransport materielTransport;

    @Column(columnDefinition = "TEXT")
    private String reference;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TypeVoyage voyage;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatutVoyage statutVoyage;

    @Column(columnDefinition = "TEXT")
    private String trajet;
}
