package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.InfoArticleMagasinId;

import javax.persistence.*;

@Entity
public class AlertStock{
    @EmbeddedId
    private InfoArticleMagasinId infoArticleMagasinId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @MapsId("magasinId")
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "FK_MAGASIN_ID",foreignKeyDefinition = "FOREIGN KEY (magasin_id) REFERENCES magasin(id_magasin) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Magasin magasin;

    @ManyToOne(cascade = CascadeType.MERGE)
    @MapsId("articleId")
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_ARTICLE_ID",foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    @ManyToOne(cascade = CascadeType.MERGE)
    @MapsId("uniteId")
    @JoinColumn(name = "unite_id",foreignKey = @ForeignKey(name = "FK_UNITE_ID",foreignKeyDefinition = "FOREIGN KEY (unite_id) REFERENCES unite(id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Unite unite;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    private Double quantite;
}
