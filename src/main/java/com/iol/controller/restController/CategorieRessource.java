package com.iol.controller.restController;

import com.iol.model.entityBeans.Categorie;
import com.iol.repository.CategorieRepository;
import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class CategorieRessource {

    @Autowired
    private CategorieRepository categorieRepository;

    @GetMapping(value = "/categories")
    public ResponseEntity<Object> getAllCategories(){
        return new ResponseEntity<>(categorieRepository.findAll(),HttpStatus.OK);
    }

    @PostMapping(value = "/categories")
    public ResponseEntity<Object> create(@RequestBody Categorie categorie){
        Categorie save = categorieRepository.save(categorie);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    };
}
