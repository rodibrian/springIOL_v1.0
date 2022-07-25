package com.iol.model.tenantEntityBeans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity(name = "filiale")
@Getter
@Setter
@NoArgsConstructor
@NamedQueries({
        @NamedQuery(name = "filiale.all",query = "from filiale")
})
public class Filiale extends Personne{

    @OneToMany(mappedBy = "filiale",cascade = CascadeType.PERSIST)
    private List<User> users;

    @OneToMany(mappedBy = "filiale",cascade = CascadeType.MERGE)
    private List<Magasin> magasins;

    @Transient
    private Double chiffreAffaire=0D;

    @PostLoad
    private void setChiffreAffaire(){

    }

    private boolean active = true;
}
