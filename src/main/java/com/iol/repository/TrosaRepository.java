package com.iol.repository;

import com.iol.model.tenantEntityBeans.Trosa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Transient;

@Repository
@Transactional
public interface TrosaRepository extends JpaRepository<Trosa,Long> {}
