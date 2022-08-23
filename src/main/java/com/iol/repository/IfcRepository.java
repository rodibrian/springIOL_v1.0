package com.iol.repository;

import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IfcRepository extends JpaRepository<InfoFilialeCaisse,Long> {
    @Query(value = "update info_filiale_caisse set mode_payement=:payement,description=:description  where" +
            "  id = ( SELECT vente.info_id from vente where vente.id =:venteId) ",nativeQuery = true)
    @Modifying(clearAutomatically = true)
    public void update(@Param("venteId") Long venteId,@Param("payement") String payement,@Param("description") String description);
}
