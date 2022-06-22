package com.iol.controller.restController;

import com.iol.model.entityBeans.Filiale;
import com.iol.repository.FilialeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class FilialeRessource {
    @Autowired
    private FilialeRepository filialeRepository;

    @GetMapping(value = "/societes")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(filialeRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/societes/{id}")
    public ResponseEntity<Object> update(@RequestBody Filiale filiale, @PathVariable(value = "id") Long id){
        Optional<Filiale> societeOptional = filialeRepository.findById(id);
        if (!societeOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        filiale.setId(id);
        filialeRepository.save(filiale);
        return new ResponseEntity<>(filiale, HttpStatus.OK);
    }

    @DeleteMapping("/societes/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            filialeRepository.deleteById(id);
            return new ResponseEntity<>(" The shop with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/societes")
    public ResponseEntity<Object> create(@RequestBody Filiale filiale){
        Filiale filiale1 = filialeRepository.save(filiale);
        return new ResponseEntity<>(filiale1, HttpStatus.CREATED);
    };
}
