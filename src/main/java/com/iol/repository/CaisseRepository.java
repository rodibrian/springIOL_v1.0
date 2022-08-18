package com.iol.repository;

import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.model.tenantEntityBeans.Unite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CaisseRepository  extends JpaRepository<InfoFilialeCaisse,Long>{
    @Query(value = "from InfoFilialeCaisse  ifc join ifc.filiale f where f.id=:filialeId")
    List<InfoFilialeCaisse> findAll(@Param("filialeId") Long filialeId);
}
