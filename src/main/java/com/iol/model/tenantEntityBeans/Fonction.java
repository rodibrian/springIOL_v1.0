package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;
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
    private String nomFonction;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "fonction_fonctionnalite",joinColumns = {@JoinColumn(name = "fonction_id",foreignKey = @ForeignKey(name = "ff_fonction_key_constraint"))},inverseJoinColumns = {
            @JoinColumn(name = "fonctionnalite_id",foreignKey = @ForeignKey(name = "ff_fonctionnalite_key_constraint"))
    })
    private List<Fonctionnalite> fonctionnalites;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "filiale_id",nullable = false)
    private Filiale filiale;
}
