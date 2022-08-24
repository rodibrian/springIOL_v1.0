package com.iol.repository;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface InfoArticleMagasinRepository extends JpaRepository<InfoArticleMagasin,Long>{
    @Query(value = "select iam.id+1 from info_article_magasin iam  order by iam.id desc limit 1",nativeQuery = true)
    Long getLastValue();
}