package com.iol.repository;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PricesRepository extends JpaRepository<PrixArticleFiliale,Long> {
    @Query(value = "select distinct article_id,unite_id,filiale_id,max(date_enregistrement),prix_vente " +
            "from prix_article_filiale group by article_id,unite_id,filiale_id",nativeQuery = true)
    List<PrixArticleFiliale> findAllByLastDate();
}
