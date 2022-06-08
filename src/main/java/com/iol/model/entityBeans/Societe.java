package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "societe")
@Table(name = "societe")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "societe.all",query = "from societe")
})
@DynamicUpdate
@DynamicInsert
public class Societe extends ClientFournisseur{
    @Column(columnDefinition = "TEXT")
    private String verset;

    @Column(columnDefinition = "TEXT")
    private String slogan;

    @OneToMany(mappedBy = "societe")
    private Set<Magasin> magasins;

    @OneToMany(mappedBy = "societe")
    private Set<MaterielTransport> materielTransports;
}
