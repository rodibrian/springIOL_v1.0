package com.iol.repository;

import com.iol.model.tenantEntityBeans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long>{
    @Query(value = "from _user as u where u.username =:name AND u.password = :pass ")
    Optional<User> checkUser(@Param("name") String username,@Param("pass") String password);

    @Query(value = "SELECT p.id,p.nom,f.nom_fonction FROM _user u, personne p , fonction f , user_magasin um WHERE um.magasin_id =:idMagasin AND ( f.id = u.fonction_id AND p.id = u.id AND um.user_id = u.id)",nativeQuery = true)
    List<String> getAllUserByMagasinId(@Param("idMagasin") Long id);

    @Query(value = "from _user u join u.fonction f where f.id =:id")
    List<User> getUserByFontionId(@Param("id") Long id);

    @Query(value = "from _user u join u.filiale f where f.id =:id")
    List<User> getAllByFiliale(@Param("id")Long id);
}
