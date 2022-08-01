package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
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

    @Query(value = "from vente v join v.infoArticleMagasin info where info.magasin.id=:magasinId and (info.date between :begin and :end)")
    List<Vente> getSalesByBetweenDate(@Param("magasinId") Long magasinId,
                                      @Param("begin") LocalDate beginDate,
                                      @Param("end")LocalDate endDate);

    @Query(value = " select refg.reference,"+
            "(select iam2.date from info_article_magasin iam2 where iam2.reference=iam.reference) date" +
            ",(select p.nom from client_fournisseur cf1 join personne p on p.id = cf1.id where cf1.id = v.client_id) client" +
            ",sum(v.montant_vente) montant_facture ," +
            "(select  p2.nom from _user u join personne p2 on u.id = p2.id where u.id = iam.user_id) operateur " +
            " from vente v join " +
            "( select iam.reference from info_article_magasin iam where iam.magasin_id=:magasinId group by iam.reference) refg on v.info_article_magasin_id = refg.id ",nativeQuery = true)
    Object getFactureGroupByRef(@Param("magasinId") Long magasinId);
}
