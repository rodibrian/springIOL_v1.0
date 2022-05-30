package com.iol.repository;

import com.iol.model.entityBeans.Transfert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface TransfertRepository extends JpaRepository<Transfert,Long> {

}
