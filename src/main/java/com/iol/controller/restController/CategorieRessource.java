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

import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class CategorieRessource {

    @Autowired
    private CategorieRepository categorieRepository;
    @GetMapping(value = "/categories")
    public ResponseEntity<Object> getAllCategories(){
        return new ResponseEntity<>(categorieRepository.findAll(),HttpStatus.OK);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Object> update(@RequestBody Categorie categorie,@PathVariable(value = "id") Long id){
            Optional<Categorie> categorieOptional = categorieRepository.findById(id);
            if (!categorieOptional.isPresent()){
                return ResponseEntity.notFound().build();
            }
            categorie.setId(id);
            categorieRepository.save(categorie);
        return new ResponseEntity<>(categorie, HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            categorieRepository.deleteById(id);
            return new ResponseEntity<>(" The category with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
    @PostMapping(value = "/categories")
    public ResponseEntity<Object> create(@RequestBody Categorie categorie){
        Categorie save = categorieRepository.save(categorie);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    };
}
