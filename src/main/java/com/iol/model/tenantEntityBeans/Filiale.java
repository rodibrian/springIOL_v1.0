package com.iol.model.tenantEntityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "filiale")
@Data
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "filiale.all",query = "from filiale")
})
@DynamicUpdate
@DynamicInsert
public class Filiale extends Personne{
    @OneToMany(mappedBy = "filiale",cascade = CascadeType.ALL)
    private Set<Magasin> magasins;
}
