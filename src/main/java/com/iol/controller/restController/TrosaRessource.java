package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Categorie;
import com.iol.model.tenantEntityBeans.Trosa;
import com.iol.repository.TrosaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class TrosaRessource {

    @Autowired
    private TrosaRepository trosaRepository;

    @GetMapping(value = "/trosas")
    public ResponseEntity<Object> getAllCategories(){
        return new ResponseEntity<>(trosaRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/trosas/{id}")
    public ResponseEntity<Object> update(@RequestBody Trosa newTrosa, @PathVariable(value = "id") Long id){
        Optional<Trosa> trosaOptional = trosaRepository.findById(id);
        if (!trosaOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        newTrosa.setId(id);
        trosaRepository.save(newTrosa);
        return new ResponseEntity<>(newTrosa, HttpStatus.OK);
    }

    @DeleteMapping("/trosas/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            trosaRepository.deleteById(id);
            return new ResponseEntity<>(" The Trosa with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
    @PostMapping(value = "/trosas")
    public ResponseEntity<Object> create(@RequestBody Trosa trosa){
        Trosa save = trosaRepository.save(trosa);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    };

}
