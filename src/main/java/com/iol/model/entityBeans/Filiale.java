package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "filiale")
@Table(name = "filiale")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "filiale.all",query = "from filiale")
})
@DynamicUpdate
@DynamicInsert
public class Filiale extends Personne{
    @OneToMany(mappedBy = "filiale")
    private Set<Magasin> magasins;

    @ManyToOne
    private User admin;

    @OneToMany(mappedBy = "filiale")
    private Set<User> users;
}
