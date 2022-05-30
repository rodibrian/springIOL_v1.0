package com.iol.model.entityBeans;

import com.iol.model.entityEmbededId.ApprovArticleId;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class ApprovArticle {

    @EmbeddedId
    private ApprovArticleId approvArticleId;

    @ManyToOne
    @MapsId("approvId")
    @JoinColumn(name = "approv_id",foreignKey =@ForeignKey(name = "appArt_approv_key_constraint"))
    private Approvisionnement approvisionnement;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id",foreignKey =@ForeignKey(name = "appArt_article_key_constraint"))
    private Article article;

    private Date datePeremption;

    private int quantite;
}
