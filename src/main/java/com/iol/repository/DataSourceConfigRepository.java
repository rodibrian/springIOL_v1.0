package com.iol.repository;

import com.iol.model.adminBeans.DataSourceConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataSourceConfigRepository extends JpaRepository<DataSourceConfig, Long> {
    DataSourceConfig findByName(String name);
}