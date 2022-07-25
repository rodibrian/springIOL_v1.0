package com.iol.repository;

import com.iol.model.entityEmbededId.StockId;
import com.iol.model.tenantEntityBeans.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Stock,StockId>{
}
