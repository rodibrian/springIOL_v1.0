package com.iol.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;

@Repository
public class SocieteRepository{

    private Connection connection;

    @Autowired
    public SocieteRepository(Connection connection) {
        this.connection = connection;
    }

    public void create(){

    }
}
