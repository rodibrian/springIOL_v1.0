package com.iol.model.entityBeans;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity(name = "categorie")
@Table(name = "categorie")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "categorie.all",query = "from categorie")
})
public class Categorie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String libelle;

//    @OneToMany(mappedBy = "categorie",fetch = FetchType.LAZY)
//    @JsonManagedReference
//    private Set<Article> articles;
    public Categorie(String libelle) {
        this.libelle = libelle;
    }
}
