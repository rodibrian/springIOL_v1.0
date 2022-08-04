package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.PricesRepository;
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
public class PriceRessource{

    @Autowired
    private PricesRepository repository;

    @PostMapping("/prices")
    public ResponseEntity<Object> create(@RequestBody List<PrixArticleFiliale> prixArticleFilialeList){
        return new ResponseEntity<>(repository.saveAll(prixArticleFilialeList),HttpStatus.OK);
    }
}
