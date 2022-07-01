package com.iol.config;

import com.iol.repository.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
public class Config{
    @Bean
    public Connection getConnection(){
        try {
            return DriverManager.getConnection("jdbc:postgresql://localhost:5432/", "postgres", "root");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
    @Bean
    public ConnectionFactory connectionFactory(){
        return new ConnectionFactory();
    }
}
