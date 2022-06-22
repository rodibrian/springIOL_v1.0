package com.iol.repository;

import com.iol.model.adminBeans.Societe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CompanyRepository {

    private Connection connection;

    @Autowired
    public CompanyRepository(Connection connection) {
        this.connection = connection;
    }

    public void create(Societe societe){
        String query = " CREATE DATABASE ?";
        try {
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, societe.getSchemaName());
            boolean execute = ps.execute();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<String> findAll(){
        Statement statement = null;
        List<String> list = new ArrayList<>();
        try {
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(" SELECT * FROM pg_database");
            while (resultSet.next()){
                String dbName = resultSet.getString(2);
                list.add(dbName);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return list;
    }
}
