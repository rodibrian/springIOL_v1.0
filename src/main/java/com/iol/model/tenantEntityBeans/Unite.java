package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "unite")
@Data
@NoArgsConstructor
@Table(name = "unite")
@NamedQueries({
        @NamedQuery(name = "unite.all",query = "from unite")
})
@DynamicUpdate
@DynamicInsert
public class Unite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String code;

    private Double quantite;

    @Column(columnDefinition = "TEXT")
    private String designation;

    private Double poids;

    private Double prix;

    private int niveau;
}
