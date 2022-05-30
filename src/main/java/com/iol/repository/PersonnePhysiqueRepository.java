package com.iol.repository;

import com.iol.model.entityBeans.PersonnePhysique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface PersonnePhysiqueRepository extends JpaRepository<PersonnePhysique,Long> {
}
