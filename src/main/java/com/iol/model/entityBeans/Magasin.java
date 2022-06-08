package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "magasin")
@Table(name = "magasin")
@Data
@NoArgsConstructor
@NamedQueries(value = {
        @NamedQuery(name = "magasin.all",query = "from magasin")
})
@DynamicUpdate
@DynamicInsert
public class Magasin {
    @Column(name = "id_magasin")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String adresse;

    @Column(columnDefinition = "TEXT")
    private String nomMagasin;

    @OneToMany(mappedBy = "magasin")
    private Set<User> users;

    @ManyToMany
    @JoinTable(name = "magasin_article",joinColumns = {@JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "mag_article_magasin_key_constraint"))},
            inverseJoinColumns = {@JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "mag_art_article_key_constraint"))})
    private Set<Article> articles;

    @ManyToOne
    @JoinColumn(name = "societeId",foreignKey = @ForeignKey(name = "magasin_societe_key_constraint"))
    private Societe societe;

    @ManyToOne
    @JoinTable(name = "responsable_magasin",joinColumns = {@JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "resp_mag_magasin_key_constraint"))},
    inverseJoinColumns = {@JoinColumn(name = "responsable_id",foreignKey = @ForeignKey(name = "resp_mag_user_key_constraint"))})
    private User responsable;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private Set<Operation> operations;
}
