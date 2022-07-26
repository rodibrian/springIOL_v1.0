package com.iol.model.tenantEntityBeans;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity(name = "transfert")
@Table(name = "transfert")
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "transfert.all",query = "from transfert")
})
public class Transfert implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "magasin_source_id",foreignKey = @ForeignKey(name = "transfert_magasin_origine_key_constraint"))
    private Magasin magasinSource;

    @ManyToOne
    @JoinColumn(name = "magasin_dest_id",foreignKey = @ForeignKey(name = "transfert_magasin_receveur_key_constraint"))
    private Magasin magasinDest;

    @Column(columnDefinition = "TEXT")
    private String chauffeur;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "article_id",foreignKey = @ForeignKey(name = "FK_ARTICLE_ID",foreignKeyDefinition = "FOREIGN KEY (article_id) REFERENCES article(article_id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Article article;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "unite_id",foreignKey = @ForeignKey(name = "FK_UNITE_ID",foreignKeyDefinition = "FOREIGN KEY (unite_id) REFERENCES unite(id) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Unite unite;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate date;

    private Double quantite;

    @Column(columnDefinition = "TEXT")
    private String description;
}
