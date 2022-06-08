package com.iol.controller.restController;

import antlr.MakeGrammar;
import com.iol.model.entityBeans.Categorie;
import com.iol.model.entityBeans.Magasin;
import com.iol.model.entityBeans.Societe;
import com.iol.repository.CategorieRepository;
import com.iol.repository.MagasinRepository;
import com.iol.repository.SocieteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SocieteRessource {
    @Autowired
    private SocieteRepository societeRepository;

    @GetMapping(value = "/societes")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(societeRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/societes/{id}")
    public ResponseEntity<Object> update(@RequestBody Societe societe, @PathVariable(value = "id") Long id){
        Optional<Societe> societeOptional = societeRepository.findById(id);
        if (!societeOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        societe.setId(id);
        societeRepository.save(societe);
        return new ResponseEntity<>(societe, HttpStatus.OK);
    }

    @DeleteMapping("/societes/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            societeRepository.deleteById(id);
            return new ResponseEntity<>(" The shop with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/societes")
    public ResponseEntity<Object> create(@RequestBody Societe societe){
        Societe societe1 = societeRepository.save(societe);
        return new ResponseEntity<>(societe1, HttpStatus.CREATED);
    };
}
