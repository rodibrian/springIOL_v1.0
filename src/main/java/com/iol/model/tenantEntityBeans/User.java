package com.iol.model.tenantEntityBeans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity(name = "_user")
@Data
@NoArgsConstructor
@Table(name = "_user")
@NamedQueries(value = {
        @NamedQuery(name = "_user.All",query = "from _user"),
        @NamedQuery(name = "_user.checkUsernameAndPassword",query = "from _user as u where u.username =?0 AND u.password = ?1")
})
public class User extends PersonnePhysique implements Serializable{

   @Column(columnDefinition = "TEXT",nullable = false)
   private String username;

   @Column(columnDefinition = "TEXT",nullable = false)
   private String password;

   @ManyToMany(cascade = CascadeType.MERGE)
   @JoinTable(name = "user_magasin",joinColumns = {@JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "user_mag_user_key_constraint"))},
   inverseJoinColumns = {@JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "user_mag_magasin_key_constraint"))})
   private Set<Magasin> magasin;

   @ManyToOne(cascade = CascadeType.MERGE)
   @JoinColumn(name = "fonction_id",foreignKey = @ForeignKey(name = "user_fonction_key_constraint"))
   private Fonction fonction;

   private Boolean enabled;

   public User(String username, String password) {
      this.username = username;
      this.password = password;
   }
}
