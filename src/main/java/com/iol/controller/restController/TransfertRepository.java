package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Transfert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public  interface TransfertRepository extends JpaRepository<Transfert,Long>{
}
