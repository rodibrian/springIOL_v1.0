package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.model.tenantEntityBeans.Sortie;
import com.iol.model.tenantEntityBeans.Supply;
import com.iol.model.wrapper.SupplyWrapper;
import com.iol.repository.SortieRepository;
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
public class SortieRessource{
    @Autowired
    private SortieRepository sortieRepository;
    @PostMapping(value = "/sorties")
    public ResponseEntity<Object> create(@RequestBody List<Sortie> sortieList){
        return new ResponseEntity<>(sortieRepository.saveAll(sortieList),HttpStatus.CREATED);
    };

}
