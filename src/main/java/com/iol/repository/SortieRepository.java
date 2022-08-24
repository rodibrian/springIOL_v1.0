package com.iol.repository;

import com.iol.model.tenantEntityBeans.Sortie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SortieRepository extends JpaRepository<Sortie,Long> {
    @Query(value = "select s.id+1 from sortie s  order by s.id desc limit 1",nativeQuery = true)
    Long getLastValue();
}
