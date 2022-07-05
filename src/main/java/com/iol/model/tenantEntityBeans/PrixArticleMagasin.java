package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.PrixArticleMagasinId;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "prx")
@Table(name = "prix_article_magasin")
@NamedQueries({
        @NamedQuery( name = "prixArt.all",query = "from prx")
})
public class PrixArticleMagasin{

    @EmbeddedId
    private PrixArticleMagasinId prixArticleMagasinId;

    @ManyToOne
    @MapsId("magasinId")
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "pam_key_constraint"))
    private Magasin magasin;

    @ManyToOne
    @MapsId("articleId")
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "pam_article_key_constraint"))
    private Article article;

    private Double montant;

    @Temporal(TemporalType.DATE)
    private Date dateEnregistrement;

    @OneToOne
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "pam_user_key_constraint"))
    private User user;
}
