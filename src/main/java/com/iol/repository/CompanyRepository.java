package com.iol.repository;

import com.iol.model.adminBeans.Societe;
import com.iol.model.entityBeans.Categorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Societe, Long> {
}
