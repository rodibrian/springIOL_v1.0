package com.iol.repository;

import com.iol.model.entityEnum.TypeCf;
import com.iol.model.tenantEntityBeans.ClientFournisseur;
import com.iol.model.tenantEntityBeans.Trosa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
@Transactional
public
interface ClientFournisseurRepository extends JpaRepository<ClientFournisseur,Long> {
    @Query("from  ClientFournisseur f where f.typeCf =:typeCf ")
    Set<ClientFournisseur> getAllExternalEntities(@Param("typeCf") TypeCf typeCf);
}
