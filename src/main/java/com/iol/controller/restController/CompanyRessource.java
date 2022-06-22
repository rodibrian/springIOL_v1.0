package com.iol.controller.restController;

import com.iol.model.adminBeans.Societe;
import com.iol.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CompanyRessource {

    private CompanyRepository companyRepository;

    @Autowired
    public CompanyRessource(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @PostMapping("/companies")
    public ResponseEntity<Object> create(@RequestBody Societe societe ){
        companyRepository.create(societe);
        return new ResponseEntity<>("", HttpStatus.CREATED);
    }

    @GetMapping("/companies")
    public ResponseEntity<Object> getAllCompanies(){
        List<String> all = companyRepository.findAll();
        return new ResponseEntity<>(all,HttpStatus.CREATED);
    }

}
