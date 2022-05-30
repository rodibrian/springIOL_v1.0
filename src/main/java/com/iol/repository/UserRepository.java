package com.iol.repository;

import com.iol.model.entityBeans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "from _user as u where u.username =:name AND u.password = :pass ")
    Optional<User> checkUser(@Param("name") String username,@Param("pass") String password);
}
