package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
import com.iol.model.wrapper.FactureWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@Repository
public interface SalesRepository extends JpaRepository<Vente,Long>{

    @Query(value = "from vente v join v.infoArticleMagasin info where trim(lower(info.article.designation)) like concat('%',trim(lower(:name)),'%') and info.magasin.id=:magasinId")
    List<Vente> getVentesByProductName(@Param("magasinId") Long magasinId, @Param("name")String name);

    @Query(value = "from vente v join v.infoArticleMagasin info where trim(lower(v.client.nom)) like concat('%',trim(lower(:name)),'%') and info.magasin.id=:magasinId ")
    List<Vente> getVentesByClientName(@Param("magasinId") Long magasinId, @Param("name")String name);

    @Query(value = "from vente v join v.infoArticleMagasin  info where info.magasin.id=:magasinId ")
    List<Vente> getSalesByStore(@Param("magasinId") Long magasinId);

    @Query(value = "from vente v join v.infoArticleMagasin  info where info.reference=:ref ")
    Vente getInvoiceBySaleRef(@Param("ref")String reference);

    @Query(value = "from vente v join v.infoArticleMagasin  info where info.reference=:ref ")
    Vente getInvoiceBysaleId(@Param("ref")String reference);

    @Query(value = "from vente v join v.infoArticleMagasin info where info.magasin.id=:magasinId and (info.date between :begin and :end)")
    List<Vente> getSalesByBetweenDate(@Param("magasinId") Long magasinId,
                                      @Param("begin") LocalDate beginDate,
                                      @Param("end")LocalDate endDate);


    @Query(value = "select refgroup.reference reference,"+
            "refgroup.somme montantTotal," +
            "iam1.date date," +
            "(select p.nom from personne p join client_fournisseur cf on p.id = cf.id  where cf.id = v.client_id) client," +
            "(select p.nom from personne p join _user u on u.id = p.id where u.id = iam1.user_id) operateur from info_article_magasin iam1 " +
            "join (select iam.reference,sum(montant_vente) somme from info_article_magasin iam join vente_info_article_magasin viam on iam.id = viam.info_article_magasin_id join vente v2 on viam.vente_id = v2.id where iam.magasin_id=:magasinId group by iam.reference) refgroup on refgroup.reference = iam1.reference " +
            "join vente_info_article_magasin viam2 on iam1.id = viam2.info_article_magasin_id join vente v on v.id = viam2.vente_id",nativeQuery = true)
    List<String> getFactureGroupByRef(@Param("magasinId") Long magasinId);

    @Query(value = "select refgroup.reference reference,"+
            "refgroup.somme montantTotal," +
            "iam1.date date," +
            "(select p.nom from personne p join client_fournisseur cf on p.id = cf.id  where cf.id = v.client_id) client," +
            "(select p.nom from personne p join _user u on u.id = p.id where u.id = iam1.user_id) operateur " +
            "from info_article_magasin iam1 " +
            "      join (select iam.reference,sum(montant_vente) somme from info_article_magasin iam join vente_info_article_magasin viam on iam.id = viam.info_article_magasin_id join vente v2 on viam.vente_id = v2.id join magasin m on iam.magasin_id = m.id_magasin where m.filiale_id=:filialeId and iam.magasin_id=:magasinId group by iam.reference) refgroup on refgroup.reference = iam1.reference " +
            "join vente_info_article_magasin viam2 on iam1.id = viam2.info_article_magasin_id join vente v on v.id = viam2.vente_id ",nativeQuery = true)
    List<String> getFactureGroupByRefAndFilialeAndMagasin(@Param("magasinId") Long magasinId, @Param("filialeId")Long filialeId);

    @Query(value = "select refgroup.reference reference,"+
            "refgroup.somme montantTotal," +
            "iam1.date date," +
            "(select p.nom from personne p join client_fournisseur cf on p.id = cf.id  where cf.id = v.client_id) client," +
            "(select p.nom from personne p join _user u on u.id = p.id where u.id = iam1.user_id) operateur from info_article_magasin iam1 " +
            "join (select iam.reference,sum(montant_vente) somme from info_article_magasin iam join vente_info_article_magasin viam on iam.id = viam.info_article_magasin_id join vente v2 on viam.vente_id = v2.id  join magasin m on iam.magasin_id = m.id_magasin where m.filiale_id=:filialeId group by iam.reference) refgroup on refgroup.reference = iam1.reference " +
            "join vente_info_article_magasin viam2 on iam1.id = viam2.info_article_magasin_id join vente v on v.id = viam2.vente_id ",nativeQuery = true)
    List<String> getFactureGroupByRefAndFiliale(@Param("filialeId")Long filialeId);

}
