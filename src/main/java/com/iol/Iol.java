package com.iol;

import com.google.common.io.Resources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
@EnableJpaAuditing
public class
Iol implements CommandLineRunner {

    @Autowired
    private LocalContainerEntityManagerFactoryBean entityManagerFactory;

    public static void main(String[] args){
        SpringApplication.run(Iol.class,args);
    }

    @Override
    public void run(String... args) throws Exception {
        String property = (String)entityManagerFactory.getJpaPropertyMap().get("hibernate.hbm2ddl.auto");
        if (property.equals("create")) createPostgresqlFunctionAndTrigger();
//        createPostgresqlFunctionAndTrigger();
    }

    private void createPostgresqlFunctionAndTrigger() throws SQLException,IOException{
        var dataSource = entityManagerFactory.getDataSource();
        Connection connection = dataSource.getConnection();
        Statement statement = connection.createStatement();
        var url = Resources.getResource("SCRIPT/INFO_ARTICLE_TRIGGER.sql");
        String queryScript = Resources.toString(url, StandardCharsets.UTF_8);
        statement.execute(queryScript);
    }
}

