package com.iol.model.entityBeans;

import com.iol.model.entityEmbededId.InfoArticleId;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity(name = "infoArticle")
public class InfoArticle {

    @EmbeddedId
    private InfoArticleId infoArticleId;

    @ManyToOne
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "info_article_magasin_key_constraint"))
    @MapsId("magasinId")
    private Magasin magasin;

    @ManyToOne
    @JoinColumn(name = "magasin_receveur",foreignKey = @ForeignKey(name = "info_article_key_constraint"))
    @MapsId("articleId")
    private Article article;

    private Double prixVente;
    private Double prixAchat;
    private Double quantite;
}
