package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Transactional
@Repository
public interface VenteRepository extends JpaRepository<Vente,Long> {
    @Query(value = "from vente")
    Set<Vente> getByProductName(@Param("name") String name);
}
