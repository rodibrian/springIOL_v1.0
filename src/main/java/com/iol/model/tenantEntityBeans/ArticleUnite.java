package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.ArticleUniteId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ArticleUnite{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "unite_id")
    private Unite unite;

    private int quantiteNiveau;
    private int niveau;
    private double poids;
}
