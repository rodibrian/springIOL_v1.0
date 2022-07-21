package com.iol.repository;
import com.iol.model.tenantEntityBeans.Article;
import com.iol.model.tenantEntityBeans.Unite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ArticleRepository extends JpaRepository<Article,Long>{
    @Query(value = "select id,code,designation,niveau,poids from unite u inner join article_unite au ON u.id = au.unite_id WHERE au.article_id =:param",nativeQuery = true)
    List<String> getAllUnite(@Param("param") Long id );
    @Query(value = "select a.article_id,a.designation,c.libelle,u.id,u.code,u.designation as ud,au.quantite_niveau from unite u,article_unite au ,article a ,categorie c WHERE u.id = au.unite_id AND au.article_id = a.article_id and a.categorie_id = c.id",nativeQuery = true)
    List<String> getAllArticle();
//    @Query(value = "select a.article_id,a.designation,c.libelle,u.designation,iam.quantite_stock from unite u , article a ,rr  inner join article a ")
//    List<String> getAllStock();
    @Query(value = "SELECT prix_vente from prix_article_filiale where article_id =:artId and unite_id =:uId and filiale_id =:fId order by date_enregistrement limit 1",nativeQuery = true)
    String getPrix(@Param("artId") Long artId,@Param("uId") Long uId,@Param("fId") Long fId);
}
