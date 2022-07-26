package com.iol.model.tenantEntityBeans;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Sortie{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "FK_MAGASIN_ID",foreignKeyDefinition = "FOREIGN KEY (magasin_id) REFERENCES magasin(id_magasin) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Magasin magasin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_ARTICLE_ID",foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "unite_id",foreignKey = @ForeignKey(name = "FK_UNITE_ID",foreignKeyDefinition = "FOREIGN KEY (unite_id) REFERENCES unite(id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Unite unite;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;
    private Double quantite;
    private LocalDate date;
    private String description;
}
