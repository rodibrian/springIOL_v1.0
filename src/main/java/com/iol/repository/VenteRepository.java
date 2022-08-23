package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Transactional
@Repository
public interface VenteRepository extends JpaRepository<Vente,Long> {
   @Query(value = "select sum(v.montantVente) from vente v join v.infoFilialeCaisse ifc where ifc.date=:date")
   Optional<Double> getSum(@Param("date")LocalDate date);
}