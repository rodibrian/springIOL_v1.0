package com.iol.controller.restController;

import com.iol.model.entityBeans.Filiale;
import com.iol.repository.SubsidiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SubsidiaryRessource {

    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    @GetMapping(value = "/subsidiaries")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(subsidiaryRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/subsidiaries/{id}")
    public ResponseEntity<Object> update(@RequestBody Filiale filiale, @PathVariable(value = "id") Long id){
        Optional<Filiale> societeOptional = subsidiaryRepository.findById(id);
        if (!societeOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        filiale.setId(id);
        subsidiaryRepository.save(filiale);
        return new ResponseEntity<>(filiale, HttpStatus.OK);
    }
    @DeleteMapping("/subsidiaries/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            subsidiaryRepository.deleteById(id);
            return new ResponseEntity<>(" The subsidiary with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
    @PostMapping(value = "/subsidiaries")
    public ResponseEntity<Object> create(@RequestBody Filiale filiale){
        Filiale filiale1 = subsidiaryRepository.save(filiale);
        return new ResponseEntity<>(filiale1, HttpStatus.CREATED);
    };
}
