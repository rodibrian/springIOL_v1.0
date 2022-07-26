package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Sortie;
import com.iol.model.tenantEntityBeans.Transfert;
import com.iol.repository.TransfertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TransfertRessource{

    @Autowired
    private TransfertRepository transfertRepository;
    @PostMapping(value = "/transferts")
    public ResponseEntity<Object> create(@RequestBody List<Transfert> transferts){
        return new ResponseEntity<>(transfertRepository.saveAll(transferts), HttpStatus.CREATED);
    };
}
