package com.iol.service;

import com.iol.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesService{

    @Autowired
    private SalesRepository salesRepository;

    public Object getFactureGroupByRef(){

        return null;
    }

}
