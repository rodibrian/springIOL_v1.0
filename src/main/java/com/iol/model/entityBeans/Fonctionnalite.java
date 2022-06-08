package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "fonctionnalite")
@Data
@NoArgsConstructor
@Table(name = "fonctionnalite")
@NamedQueries({
        @NamedQuery(name = "fonctionnalite.all",query = "from fonctionnalite")
})
@DynamicUpdate
@DynamicInsert
public class Fonctionnalite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToMany(mappedBy = "fonctionnalites")
//    private Set<Fonction> fonction;

    @Column(columnDefinition = "TEXT")
    private String nom;
}
