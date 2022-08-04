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
    @Query("from  ClientFournisseur cf join cf.filiale f where cf.type =:typeCf and f.id=:filialeId ")
    List<ClientFournisseur> getAllExternalEntities(@Param("typeCf") Integer typeCf,@Param("filialeId") Long filialeId);

    @Query("from  ClientFournisseur cf join cf.filiale f where cf.type =0 and f.id=:filialeId ")
    List<ClientFournisseur> getAllClient(@Param("filialeId") Long filialeId );

    @Query("from  ClientFournisseur cf join cf.filiale f where cf.type =1 and f.id=:filialeId")
    List<ClientFournisseur> getAllCustomer(@Param("filialeId") Long filialeId );
}
