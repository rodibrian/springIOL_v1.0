package com.iol.repository;

import com.iol.model.tenantEntityBeans.Fonction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface FonctionRepository extends JpaRepository<Fonction,Long> {
}
