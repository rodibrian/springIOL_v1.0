package com.iol.repository;
import com.iol.model.tenantEntityBeans.Article;
import com.iol.model.tenantEntityBeans.Unite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ArticleRepository extends JpaRepository<Article,Long>{

    @Query(value = "select u.id,code,designation,niveau,poids from unite u inner join article_unite au ON u.id = au.unite_id WHERE au.article_id =:param",nativeQuery = true)
    List<String> getAllUnite(@Param("param") Long id);

    @Query(value = "select a.article_id,a.designation,c.libelle,u.id,u.code,u.designation as ud,au.quantite_niveau from unite u,article_unite au ,article a ,categorie c WHERE u.id = au.unite_id AND au.article_id = a.article_id and a.categorie_id = c.id",nativeQuery = true)
    List<String> getAll();

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation,s.count as nb from " +
            " unite u , Stock s , (select magasin_id,unite_id,article_id from approv group by magasin_id,unite_id,article_id) as app , article a , categorie  c " +
            "WHERE app.article_id = a.article_id and app.unite_id = u.id " +
            "and app.magasin_id = s.magasin_id and a.categorie_id = c.id " +
            "and s.article_id = app.article_id and s.unite_id =  app.unite_id ",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDate();

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation,s.count as nb from " +
            " unite u , Stock s,(select magasin_id,unite_id,article_id from approv group by magasin_id,unite_id,article_id) as app , article a , categorie  c " +
            "WHERE app.article_id = a.article_id and app.unite_id = u.id " +
            "and app.magasin_id = s.magasin_id and a.categorie_id = c.id " +
            "and s.article_id = app.article_id and s.unite_id =  app.unite_id and s.magasin_id=:magasinId ",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDate(@Param("magasinId") Long magasinId);


    @Query(value = "SELECT prix_vente from prix_article_filiale where article_id =:artId and unite_id =:uId and filiale_id =:fId order by date_enregistrement limit 1",nativeQuery = true)
    String getPrix(@Param("artId") Long artId,@Param("uId") Long uId,@Param("fId") Long fId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update stock set " +
            " count = :newVal + stock.count" +
            " where unite_id =:uniteId and magasin_id=:magasinId and article_id=:articleId",nativeQuery = true)
    void updateStock(@Param("newVal") Double value,@Param("uniteId") Long uniteId,@Param("magasinId") Long magasinId,@Param("articleId") Long articleId);
}
