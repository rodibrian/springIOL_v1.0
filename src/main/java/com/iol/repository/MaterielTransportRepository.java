package com.iol.repository;

import com.iol.model.tenantEntityBeans.MaterielTransport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface MaterielTransportRepository extends JpaRepository<MaterielTransport,Long> {
}
