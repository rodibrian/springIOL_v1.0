package com.iol.repository;

import com.iol.model.entityEmbededId.InfoArticleMagasinId;
import com.iol.model.tenantEntityBeans.InventoryAlert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface InventoryAlertRepository extends CrudRepository<InventoryAlert,InfoArticleMagasinId>{
    @Query(value = "from InventoryAlert ia join ia.unite u join ia.article a join ia.magasin m where m.id=:magasinId and a.id=:articleId and u.id=:uniteId")
    List<InventoryAlert> getAllByArticleAndUniteAndMagasin(@Param("magasinId") Long magasinId
                                                          ,@Param("articleId") Long articleId ,
                                                           @Param("uniteId") Long uniteId );
}
