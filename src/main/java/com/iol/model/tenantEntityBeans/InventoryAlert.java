package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.InfoArticleMagasinId;
import com.iol.model.entityEmbededId.InventoryAlertId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class InventoryAlert{
    @EmbeddedId
    private InventoryAlertId inventoryAlertId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @MapsId("filialeId")
    @JoinColumn(name = "filiale_id")
    private Filiale filiale;

    @ManyToOne(cascade = CascadeType.MERGE)
    @MapsId("articleId")
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_ARTICLE_ID",foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    private Double quantite;
}
