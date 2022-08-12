package com.iol.repository;
import com.iol.model.tenantEntityBeans.Article;
import com.iol.model.tenantEntityBeans.ArticleUnite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
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

    @Query(value = " select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id ,gp.day_count from article a join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite , date_part('day',(now()-date_peremption))  day_count   from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id" +
            " where m.filiale_id = :filialeId and ap.quantite_peremption > 0 group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id ",nativeQuery = true)
    List<String> getProductExpiration(@Param("filialeId") Long filialeId);

    @Query(value = " select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id,gp.day_count from article a join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite, date_part('day',(now()-date_peremption))  day_count   from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id" +
            " where m.filiale_id = :filialeId and ap.quantite_peremption > 0 and date_part('day',(now()-date_peremption)) between :begin and :end  group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id ",nativeQuery = true)
    List<String> getProductExpirationByStatus(@Param("filialeId") Long filialeId, @PathVariable("begin") int begin , @PathVariable("end") int end);

    @Query(value = " select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id,gp.day_count from article a join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite, date_part('day',(now()-date_peremption))  day_count  from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id" +
            " where m.filiale_id = :filialeId and ap.quantite_peremption > 0 and date_part('day',(now()-date_peremption)) > :value  group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id ",nativeQuery = true)
    List<String> getProductExpirationByStatusStrong(@Param("filialeId") Long filialeId, @PathVariable("value") int value );

    @Query(value = " select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id,gp.day_count  from article a join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite, date_part('day',(now()-date_peremption))  day_count from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id" +
            " where m.filiale_id = :filialeId and ap.quantite_peremption > 0 and date_part('day',(now()-date_peremption)) <= :value  group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id ",nativeQuery = true)
    List<String> getProductExpirationByStatusExpired(@Param("filialeId") Long filialeId, @PathVariable("value") int value );

    @Query(value = " select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id,gp.day_count from article a join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite, date_part('day',(now()-date_peremption))  day_count  from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id" +
            " where m.id_magasin = :magasinId and ap.quantite_peremption > 0 group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id ",nativeQuery = true)
    List<String> getProductExpirationByStore(@Param("magasinId") Long magasinId);

    @Query(value = "select a.designation ad,u.designation ud,gp.date_pr,gp.sum_quantite,gp.magasin_id,gp.article_id,gp.unite_id,gp.day_count from article a " +
            " join (select iam.magasin_id,iam.article_id,iam.unite_id,ap.date_peremption date_pr ,sum(ap.quantite_peremption) sum_quantite,date_part('day',(now()-date_peremption))  day_count from approv ap join info_article_magasin iam on iam.id = ap.info_article_magasin_id " +
            " join magasin m on m.id_magasin = iam.magasin_id where m.filiale_id = :filialeId and ap.quantite_peremption > 0 group by date_peremption ,iam.article_id,iam.unite_id,iam.magasin_id order by date_peremption) as gp on a.article_id = gp.article_id join unite u on u.id = gp.unite_id" +
            " where trim(lower(a.designation)) like concat('%',trim(lower(:name)),'%')  ",nativeQuery = true)
    List<String> getProductExpirationByProductName(@Param("name") String productName,@Param("filialeId") Long filialeId);


//    @Modifying(clearAutomatically = true)
//    @Query(value = "update approv ap set date_peremption =:new_data " +
//            "where (select ap1.id from approv ap1 join info_article_magasin iam on iam.id = ap1.info_article_magasin_id where iam.magasin_id=1 and iam.article_id=1 and iam.unite_id =2 and ap1.date_peremption =:old_date ) = ap.id ",nativeQuery = true)
//    void updateExpirationDate(@Param("magasinId") Long magasinId,
//                                     @Param("articleId")Long articleId,
//                                     @Param("uniteId")Long uniteId,
//                                     @Param("new_date") LocalDate newDate,
//                                     @Param("old_date")LocalDate oldDate);

    @Modifying(clearAutomatically = true)
    @Query(value= "CALL mettre_a_jour_date_peremption(:id_magasin,:id_article,:id_unite,:new_date,:old_date)",nativeQuery = true)
    void updateExpirationDate(@Param("id_magasin") Long magasinId,
                              @Param("id_article")Long articleId,
                              @Param("id_unite")Long uniteId,
                              @Param("new_date") LocalDate newDate,
                              @Param("old_date")LocalDate oldDate);

}


