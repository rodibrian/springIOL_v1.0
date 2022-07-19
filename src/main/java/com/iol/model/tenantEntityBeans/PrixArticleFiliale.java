package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.PrixArticleFilialeId;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "prix_article_filiale")
@Data
public class PrixArticleFiliale {
    @EmbeddedId
    private PrixArticleFilialeId prixArticleFilialeId;

    @ManyToOne
    @MapsId("filialeId")
    @JoinColumn(name = "filiale_id")
    private Filiale filiale;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @MapsId("uniteId")
    @JoinColumn(name = "unite_id")
    private Unite unite;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double montant;

    @Temporal(TemporalType.DATE)
    private Date dateEnregistrement;
}
