package com.iol.repository;

import com.iol.model.entityEmbededId.InfoArticleMagasinId;
import com.iol.model.tenantEntityBeans.AlertStock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface AlertStockRepository extends CrudRepository<AlertStock,InfoArticleMagasinId>{
}
