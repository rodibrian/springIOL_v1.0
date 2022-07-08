package com.iol.repository;

import com.iol.model.tenantEntityBeans.ClientFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
@Transactional
public
interface ClientFournisseurRepository extends JpaRepository<ClientFournisseur,Long> {
    @Query("from  ClientFournisseur f where f.type =:typeCf ")
    List<ClientFournisseur> getAllExternalEntities(@Param("typeCf") Integer typeCf);

    @Query("from  ClientFournisseur f where f.type =0 ")
    List<ClientFournisseur> getAllClient();

    @Query("from  ClientFournisseur f where f.type =1 ")
    List<ClientFournisseur> getAllCustomer();
}
