package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.PrixArticleMagasinId;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
public class InfoArticleMagasin {
    @EmbeddedId
    private PrixArticleMagasinId prixArticleMagasinId;

    @ManyToOne
    @MapsId("magasinId")
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "infoAm_key_constraint"))
    private Magasin magasin;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "infoAm_article_key_constraint"))
    private Article article;

    private Double quantiteStock;
}
