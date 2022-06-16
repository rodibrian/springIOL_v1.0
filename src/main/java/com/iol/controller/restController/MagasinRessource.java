package com.iol.controller.restController;
import com.iol.model.entityBeans.Categorie;
import com.iol.model.entityBeans.Magasin;
import com.iol.repository.MagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.PostLoad;
import java.util.Optional;

@RestController
public class MagasinRessource {

    private MagasinRepository magasinRepository;

    @Autowired
    public void setMagasinRepository(MagasinRepository magasinRepository) {
        this.magasinRepository = magasinRepository;
    }

    @GetMapping("/magasins")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(magasinRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/magasins")
    public ResponseEntity<Object> create(@RequestBody Magasin magasin){
        Magasin save = magasinRepository.save(magasin);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }

    @PutMapping("/magasins/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Long id,@RequestBody Magasin magasin){
        Optional<Magasin> optionalMagasin = magasinRepository.findById(id);
        if (!optionalMagasin.isPresent()){
            return ResponseEntity.notFound().build();
        }
        magasin.setId(id);
        magasinRepository.save(magasin);
        return new ResponseEntity<>(magasin, HttpStatus.OK);
    }

    @DeleteMapping("/magasins/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            magasinRepository.deleteById(id);
            return new ResponseEntity<>(" The store with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
}
