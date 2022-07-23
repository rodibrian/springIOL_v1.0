package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.StockId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Stock {
    @EmbeddedId
    private StockId stockId;

    @ManyToOne
    @JoinColumn(name = "magasin_id")
    @MapsId(value = "magasinId")
    private Magasin magasin;

    @ManyToOne
    @JoinColumn(name = "unite_id")
    @MapsId(value = "uniteId")
    private Unite unite;

    @ManyToOne
    @JoinColumn(name = "article_id")
    @MapsId(value = "articleId")
    private Article article;

    private Double count;
}
