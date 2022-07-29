package com.iol.repository;

import com.iol.model.tenantEntityBeans.Sortie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SortieRepository extends JpaRepository<Sortie,Long> {
}
