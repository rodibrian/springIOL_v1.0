package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity(name = "article")
@Data
@NoArgsConstructor
@NamedQueries(value = {
        @NamedQuery(name = "article.all",query = "from article")
})
public class Article implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @OneToMany(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinTable(name = "article_unite",joinColumns = {
            @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "au_article"))
    },inverseJoinColumns = {
            @JoinColumn(name = "unite_id",foreignKey = @ForeignKey(name = "au_unite"))
    })
    private Set<Unite> unite;

    private Double prix;

    @ManyToOne(targetEntity = Categorie.class)
    @JoinColumn(name = "categorieId",foreignKey = @ForeignKey(name = "article_categorie_key_constraint"))
    private Categorie categorie;

    @ManyToMany(mappedBy = "articles")
    private Set<Magasin> magasins;

    @Lob
    private byte[] image;

    @Temporal(TemporalType.DATE)
    private Date datePeremption;
}
