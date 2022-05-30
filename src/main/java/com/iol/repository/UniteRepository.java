package com.iol.repository;

import com.iol.model.entityBeans.Unite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface UniteRepository extends JpaRepository<Unite,Long> {
}
