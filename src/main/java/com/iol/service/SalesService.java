package com.iol.service;

import com.iol.model.wrapper.FactureWrapper;
import com.iol.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalesService{
    @Autowired
    private SalesRepository salesRepository;

    public List<FactureWrapper> getFactureGroupByRefAndFilialeAndMagasin(Long magasinId,Long filialeId){
        List<String> factureGroupByRef = salesRepository.getFactureGroupByRefAndFilialeAndMagasin(magasinId,filialeId);
        List<FactureWrapper> factureWrappers = initWrapper(factureGroupByRef);
        return factureWrappers;
    }

    private List<FactureWrapper> initWrapper(List<String> factureGroupByRef) {
        List<FactureWrapper> factureWrappers = new ArrayList<>();
        factureGroupByRef.forEach(s -> {
            String[] split = s.split(",");
            if (split.length!=0){
                String reference = split[0];
                String montantTotal = split[1];
                String date = split[2];
                String client = split[3];
                String operateur = split[4];
                factureWrappers.add(new FactureWrapper(client,operateur,montantTotal,reference,date));
            }
        });
        return factureWrappers;
    }

    public List<FactureWrapper> getFactureGroupByRefAndFiliale(Long magasinId){
        List<String> factureGroupByRef = salesRepository.getFactureGroupByRefAndFiliale(magasinId);
        List<FactureWrapper> factureWrappers = initWrapper(factureGroupByRef);
        return factureWrappers;
    }
}
