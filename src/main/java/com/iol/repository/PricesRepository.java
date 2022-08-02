package com.iol.repository;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricesRepository extends JpaRepository<PrixArticleFiliale,Long>{

    @Query(value = "select paf2.id,paf2.unite_id,paf2.article_id,paf2.filiale_id,paf2.prix_vente,paf2.date_enregistrement,paf2.user_id from " +
            "(select paf.filiale_id as f_id,paf.unite_id as u_id,paf.article_id as a_id ,max(date_enregistrement) as max\n" +
            "from prix_article_filiale paf group by paf.filiale_id,paf.unite_id,paf.article_id) as last join prix_article_filiale paf2 on" +
            "    paf2.date_enregistrement = max and  paf2.filiale_id = f_id and paf2.article_id = a_id  and  paf2.unite_id = u_id",nativeQuery = true)
    List<PrixArticleFiliale> findAllByLastDate();

    @Query(value = "from PrixArticleFiliale p join p.unite u join p.article a join  p.filiale f where" +
            " u.id=:uniteId and f.id=:filialeId and a.id=:articleId")
    List<PrixArticleFiliale> findAll(@Param("uniteId") Long uniteId,
                                     @Param("articleId") Long articleId,
                                     @Param("filialeId") Long filialeId);
}
