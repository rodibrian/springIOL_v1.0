package com.iol.repository;

import com.iol.model.entityBeans.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface CategorieRepository extends JpaRepository<Categorie,Long> {
}
