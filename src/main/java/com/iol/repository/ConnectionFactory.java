package com.iol.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    private static Connection connection;
    public static Connection getConnection(String dbName){
        try {
            if (connection==null || connection.isClosed() ){
                try {
                    connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/"+dbName,"postgres","root");
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return connection;
    }
}
