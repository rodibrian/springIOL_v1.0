package com.iol.controller.restController;


import com.iol.model.entityBeans.Categorie;
import com.iol.model.entityBeans.Unite;
import com.iol.repository.CategorieRepository;
import com.iol.repository.UniteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Optional;

@RestController
public class UniteRessource {
    @Autowired
   private UniteRepository uniteRepository;

    @GetMapping(value = "/unites")
    public ResponseEntity<Object> getAllUnites(){
        return new ResponseEntity<>(uniteRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/unites/{id}")
    public ResponseEntity<Object> update(@RequestBody Unite unite, @PathVariable(value = "id") Long id){
        Optional<Unite> uniteOptional = uniteRepository.findById(id);
        if (!uniteOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        unite.setId(id);
        uniteRepository.save(unite);
        return new ResponseEntity<>(unite, HttpStatus.OK);
    }

    @DeleteMapping("/unites/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            uniteRepository.deleteById(id);
            return new ResponseEntity<>(" The category with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/unites")
    public ResponseEntity<Object> create(@RequestBody Unite unite){
       Unite save = uniteRepository.save(unite);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    };

}
