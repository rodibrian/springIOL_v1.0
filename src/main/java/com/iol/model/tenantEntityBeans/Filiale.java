package com.iol.model.tenantEntityBeans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Filiale extends Personne{
    @JsonIgnore
    @OneToMany(mappedBy = "filiale",cascade = CascadeType.ALL)
    private Set<Magasin> magasins;
}
