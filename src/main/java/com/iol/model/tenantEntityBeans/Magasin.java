package com.iol.model.tenantEntityBeans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "magasin")
@Table(name = "magasin")
@Getter
@Setter
@NoArgsConstructor
@NamedQueries(value = {
        @NamedQuery(name = "magasin.all",query = "from magasin")
})
public class Magasin{
    @Id
    @Column(name = "id_magasin")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String adresse;

    @Column(columnDefinition = "TEXT")
    private String nomMagasin;

    @ManyToMany
    @JoinTable(name = "magasin_article",
            joinColumns = {@JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name ="FK_MA_MAGASIN_ID",foreignKeyDefinition = "foreign key (magasin_id) references magasin(id_magasin) on delete cascade"))},
            inverseJoinColumns = {@JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_MA_ARTICLE_ID",foreignKeyDefinition = "foreign key (article_id) references article(article_id) on delete cascade"))})
    private Set<Article> articles;

    @ManyToOne(cascade= CascadeType.MERGE)
    @JoinColumn(name = "filialeId",foreignKey = @ForeignKey(name = "magasin_filiale_key_constraint"))
    private Filiale filiale;

    @JsonIgnore
    @ManyToMany(mappedBy = "magasin")
    private Set<User> users;

    @OneToMany
    private Set<Operation> operations;
}
