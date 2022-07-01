package com.iol.model.entityBeans;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "_user")
@Data
@NoArgsConstructor
@Table(name = "_user")
@NamedQueries(value = {
        @NamedQuery(name = "_user.All",query = "from _user"),
        @NamedQuery(name = "_user.checkUsernameAndPassword",query = "from _user as u where u.username =?0 AND u.password = ?1")
})
@DynamicUpdate
@DynamicInsert
public class User extends PersonnePhysique implements Serializable{
   @ManyToOne
   @JoinTable(name = "utilisateur_filiale",joinColumns = {@JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "user_fil_user_key_constraint"))},
   inverseJoinColumns = {@JoinColumn(name = "filiale_id",foreignKey = @ForeignKey(name = "user_filiale_key_constraint"))})
   private Filiale filiale;

   @ManyToOne(cascade = CascadeType.PERSIST)
   @JoinColumn(name = "fonction_id",foreignKey = @ForeignKey(name = "user_fonction_key_constraint"))
   private Fonction fonction;
}
