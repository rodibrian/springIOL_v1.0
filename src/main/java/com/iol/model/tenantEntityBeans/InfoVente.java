package com.iol.model.tenantEntityBeans;

import com.iol.model.entityEmbededId.InfoVenteId;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@Data
@NoArgsConstructor
public class InfoVente {
    @EmbeddedId
    private InfoVenteId infoVenteId;

    @ManyToOne
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "info_vente_article_key_constraint"))
    @MapsId("articleId")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "info_vente_vente_key_constraint"))
    @MapsId("venteId")
    private Vente vente;

    private Date dateVente;

    private Double prixVente;

    private String reference;

    private Double quantite;
}
