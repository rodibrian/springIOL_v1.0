package com.iol.controller.restController;

import com.iol.model.entityBeans.Categorie;
import com.iol.model.entityBeans.Fonctionnalite;
import com.iol.repository.FonctionnaliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpClient;
import java.util.Optional;

@RestController
public class fonctionnaliteRessource {

    private FonctionnaliteRepository fonctionnaliteRepository;

    @Autowired
    public fonctionnaliteRessource(FonctionnaliteRepository fonctionnaliteRepository) {
        this.fonctionnaliteRepository = fonctionnaliteRepository;
    }

    @GetMapping("/fonctionnalities")
    public ResponseEntity<Object> getAll(){
      return new ResponseEntity<>(fonctionnaliteRepository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/fonctionnalities")
    public ResponseEntity<Object> create(@RequestBody Fonctionnalite fonctionnalite){
        Fonctionnalite savedFonctionnality = fonctionnaliteRepository.save(fonctionnalite);
        return new ResponseEntity<>(savedFonctionnality,HttpStatus.OK);
    }

    @PutMapping("/fonctionnalities/{id}")
    public ResponseEntity<Object> update(@RequestBody Fonctionnalite fonctionnalite,@PathVariable("id") Long id){
        Optional<Fonctionnalite> optional = fonctionnaliteRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build(

            );
        }
        fonctionnalite.setId(id);
        fonctionnaliteRepository.save(fonctionnalite);
        return new ResponseEntity<>(fonctionnalite,HttpStatus.OK);
    }

    @DeleteMapping("/fonctionnalities/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            fonctionnaliteRepository.deleteById(id);
            return new ResponseEntity<>(" The feature with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

}
