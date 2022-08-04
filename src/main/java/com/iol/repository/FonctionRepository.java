package com.iol.repository;

import com.iol.model.tenantEntityBeans.Fonction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FonctionRepository extends JpaRepository<Fonction,Long>{
    @Query(value = "from fonction f join f.filiale fl where fl.id =:filialeId ")
    List<Fonction> getAllByFiliale(@Param("filialeId") Long id );
}
