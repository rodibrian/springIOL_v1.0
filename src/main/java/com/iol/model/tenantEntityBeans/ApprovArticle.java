package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.ApprovArticleId;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@DynamicUpdate
@DynamicInsert
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

    private Double quantite;

    private Double prixAchat;
}
