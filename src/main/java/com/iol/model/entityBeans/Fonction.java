package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "fonction")
@Table(name = "fonction")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "fonction.all",query = "from fonction")
})
public class Fonction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String code;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "fonction_fonctionnalite",joinColumns = {@JoinColumn(name = "fonction_id",foreignKey = @ForeignKey(name = "ff_fonction_key_constraint"))},inverseJoinColumns = {
            @JoinColumn(name = "fonctionnalite_id",foreignKey = @ForeignKey(name = "ff_fonctionnalite_key_constraint"))
    })
    private Set<Fonctionnalite> fonctionnalites;
}
