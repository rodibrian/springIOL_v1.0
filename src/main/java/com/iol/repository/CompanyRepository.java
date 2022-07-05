package com.iol.repository;

import com.iol.model.adminBeans.Societe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Societe, Long> {
}
