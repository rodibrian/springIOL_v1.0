package com.iol.repository;
import com.iol.model.tenantEntityBeans.Article;
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

    @Query(value = "SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id =:articleId AND au.unite_id=:uniteId" ,nativeQuery = true)
    Double getQuantiteNiveau(@Param("uniteId") Long uniteId , @Param("articleId") Long articleId);

    @Query(value = "select id,code,designation,niveau,poids from unite u inner join article_unite au ON u.id = au.unite_id WHERE au.article_id =:param",nativeQuery = true)
    List<String> getAllUnite(@Param("param") Long id);

    @Query(value = "select a.article_id,a.designation,c.libelle,u.id,u.code,u.designation as ud,au.quantite_niveau from unite u,article_unite au ,article a ,categorie c WHERE u.id = au.unite_id AND au.article_id = a.article_id and a.categorie_id = c.id",nativeQuery = true)
    List<String> getAll();

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle,u.designation,"+
            "(s.count*(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb " +
            "FROM unite u ,Stock s,article_unite au , article a ,categorie c "+
            "WHERE au.article_id = a.article_id and au.unite_id = u.id " +
            "and a.categorie_id = c.id "+
            "and s.article_id = au.article_id",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDate();

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count*(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id " +
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and s.magasin_id=:magasinId ",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDate(@Param("magasinId") Long magasinId);

    @Query(value = "SELECT prix_vente from prix_article_filiale where article_id =:artId and unite_id =:uId and filiale_id =:fId order by date_enregistrement limit 1",nativeQuery = true)
    String getPrix(@Param("artId") Long artId,@Param("uId") Long uId,@Param("fId") Long fId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update stock set " +
            " count = :newVal + stock.count" +
            " where unite_id =:uniteId and magasin_id=:magasinId and article_id=:articleId",nativeQuery = true)
    void updateStock(@Param("newVal") Double value,@Param("uniteId") Long uniteId,@Param("magasinId") Long magasinId,@Param("articleId") Long articleId);

    @Query(value = "SELECT au.unite_id FROM article_unite au where article_id =:articleId and au.niveau = 1",nativeQuery = true)
    Long getPrimaryUniteId(@Param("articleId")Long articleId);

    @Query(value = "SELECT u.id ,au.niveau,au.quantite_niveau FROM unite u inner join article_unite au ON u.id = au.unite_id where article_id =:articleId",nativeQuery = true)
    List<String> getAllUniteAndNiveau(@Param("articleId")Long articleId);

    @Query(value = "SELECT count(*) from stock s WHERE s.article_id =:articleId AND s.unite_id=:uniteId and s.magasin_id=:magasinId" ,nativeQuery = true)
    int getStockCount(@Param("uniteId") Long uniteId,@Param("magasinId") Long magasinId,@Param("articleId") Long articleId);

    @Modifying
    @Query(value = "INSERT into stock (article_id,unite_id,magasin_id,count) values (:articleId,:uniteId,:magasinId,:count);",nativeQuery = true)
    int saveInventory(@Param("uniteId") Long uniteId
                      ,@Param("magasinId") Long magasinId,
                       @Param("articleId") Long articleId,
                       @Param("count") Double count);
}


