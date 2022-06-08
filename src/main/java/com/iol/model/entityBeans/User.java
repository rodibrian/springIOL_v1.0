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

   @Column(columnDefinition = "TEXT",nullable = false)
   private String username;

   @Column(columnDefinition = "TEXT",nullable = false)
   private String password;

   @ManyToOne(fetch = FetchType.EAGER)
   @JoinTable(name = "utilisateur_magasin",joinColumns = {@JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "user_mag_user_key_constraint"))},
   inverseJoinColumns = {@JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "user_mag_magasin_key_constraint"))})
   private Magasin magasin;

   @ManyToOne(cascade = CascadeType.PERSIST)
   @JoinColumn(name = "fonction_id",foreignKey = @ForeignKey(name = "user_fonction_key_constraint"))
   private Fonction fonction;

   public User(String username, String password) {
      this.username = username;
      this.password = password;
   }
}
