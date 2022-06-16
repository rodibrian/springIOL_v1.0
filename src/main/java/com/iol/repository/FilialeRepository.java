package com.iol.repository;

import com.iol.model.entityBeans.Filiale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface FilialeRepository extends JpaRepository<Filiale,Long>{
}
