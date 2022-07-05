package com.iol.repository;

import com.iol.model.tenantEntityBeans.Approvisionnement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface ApprovRepository extends JpaRepository<Approvisionnement,Long> {
}
