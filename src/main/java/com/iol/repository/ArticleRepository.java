package com.iol.repository;
import com.iol.model.tenantEntityBeans.Article;
import com.iol.model.tenantEntityBeans.ArticleUnite;
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

    @Query(value = "from ArticleUnite au join au.article a join au.filiale f WHERE a.id=:articleId and f.id=:filialeId")
    List<ArticleUnite> getAllUnite(@Param("articleId") Long articleId,@Param("filialeId") Long filialeId);

    @Query(value = "from ArticleUnite au join au.filiale f join au.article a where f.id=:filialeId and a.status ='USED'")
    List<ArticleUnite> getAllNotDeletedAndNotHidden(@Param("filialeId")Long filialeId);

    @Query(value = "from ArticleUnite au join au.filiale f where f.id=:filialeId")
    List<ArticleUnite> getAll(@Param("filialeId")Long filialeId);

    @Query(value = "from ArticleUnite au join au.filiale f join au.article a where f.id=:filialeId and lower(a.designation) like concat('%',lower(:name),'%') ")
    List<ArticleUnite> getAllByItemName(@Param("filialeId")Long filialeId,@Param("name") String name);


    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle,u.designation,"+
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u ,Stock s,article_unite au , article a ,categorie c , magasin m "+
            "WHERE au.article_id = a.article_id and au.unite_id = u.id " +
            "and a.categorie_id = c.id "+
            "and s.article_id = au.article_id and m.id_magasin = s.magasin_id ",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDateByItemName();

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c , magasin m " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id "+
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and s.magasin_id=:magasinId and m.id_magasin = s.magasin_id",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDateByItemName(@Param("magasinId") Long magasinId);

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c , magasin m " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id "+
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and s.magasin_id=:magasinId and m.id_magasin = s.magasin_id and lower(trim(a.designation)) like concat('%',lower(trim(:name)),'%') ",nativeQuery = true)
    List<String> getStockWithPriceAndExpirationDateByItemName(@Param("magasinId") Long magasinId,@Param("name")String name);

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c , magasin m " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id "+
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and m.filiale_id=:filialeId and m.id_magasin = s.magasin_id and lower(trim(a.designation)) like concat('%',lower(trim(:name)),'%')",nativeQuery = true)
    List<String> getSubsidiaryInventoryWithPriceAndExpirationDateByItemName(@Param("filialeId") Long filialeId,@Param("name")String name);

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c , magasin m " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id "+
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and m.filiale_id=:filialeId and m.id_magasin = s.magasin_id",nativeQuery = true)
    List<String> getSubsidiaryInventoryWithPriceAndExpirationDate(@Param("filialeId") Long filialeId);

    @Query(value = "select a.article_id,u.id,s.magasin_id,a.designation as ad,c.libelle, u.designation," +
            "(s.count/(SELECT au.quantite_niveau FROM  article_unite au WHERE au.article_id = a.article_id AND au.unite_id = u.id)) as nb , m.nom_magasin " +
            "FROM unite u , Stock s , article_unite as au , article a , categorie  c , magasin m " +
            "WHERE au.article_id = a.article_id and au.unite_id = u.id "+
            "and a.categorie_id = c.id " +
            "and s.article_id = au.article_id and m.filiale_id=:filialeId and m.id_magasin = s.magasin_id " +
            "and s.count<=(select ia.quantite from inventory_alert ia where a.article_id=ia.article_id and ia.filiale_id=m.filiale_id) ",nativeQuery = true)
    List<String> getSubsidiaryInventoryAlert(@Param("filialeId") Long filialeId);

    @Query(value = "SELECT prix_vente from prix_article_filiale where article_id =:artId and unite_id =:uId and filiale_id =:fId order by date_enregistrement desc limit 1",nativeQuery = true)
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


    @Query(value = "SELECT s.count/au.quantite_niveau from stock s join article_unite au on s.article_id = au.article_id and au.unite_id=s.unite_id " +
                   "WHERE s.article_id =:articleId AND s.unite_id=:uniteId and s.magasin_id=:magasinId" ,nativeQuery = true)
    Double getStock(@Param("uniteId") Long uniteId,@Param("magasinId") Long magasinId,@Param("articleId") Long articleId);


    @Modifying
    @Query(value = "INSERT into stock (article_id,unite_id,magasin_id,count) values (:articleId,:uniteId,:magasinId,:count);",nativeQuery = true)
    int saveInventory(@Param("uniteId") Long uniteId
                      ,@Param("magasinId") Long magasinId,
                       @Param("articleId") Long articleId,
                       @Param("count") Double count);

}


