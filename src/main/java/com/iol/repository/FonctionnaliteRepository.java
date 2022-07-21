package com.iol.repository;
import com.iol.model.tenantEntityBeans.Fonctionnalite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface FonctionnaliteRepository extends JpaRepository<Fonctionnalite,Long> {
}
