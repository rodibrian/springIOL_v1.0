package com.iol.repository;

import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IfcRepository extends JpaRepository<InfoFilialeCaisse,Long> {
}
