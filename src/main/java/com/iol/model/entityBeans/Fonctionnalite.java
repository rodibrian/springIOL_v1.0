package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "fonctionnalite")
@Data
@NoArgsConstructor
@Table(name = "fonctionnalite")
@NamedQueries({
        @NamedQuery(name = "fonctionnalite.all",query = "from fonctionnalite")
})
public class Fonctionnalite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String nom;
}
