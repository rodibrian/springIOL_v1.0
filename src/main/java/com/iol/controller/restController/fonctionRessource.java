package com.iol.controller.restController;
import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.Fonctionnalite;
import com.iol.repository.FonctionRepository;
import com.iol.repository.FonctionnaliteRepository;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class fonctionRessource {

    @Autowired
    private FonctionRepository fonctionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/fonctions")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(fonctionRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/fonctions")
    public ResponseEntity<Object> create(@RequestBody Fonction fonction){
        Fonction savedFonctionnality = fonctionRepository.save(fonction);
        return new ResponseEntity<>(savedFonctionnality,HttpStatus.OK);
    }

    @GetMapping(value = "/fonctions/{id}/users")
    public ResponseEntity<Object> getUserByFonctionId(@PathVariable("id") Long id){
        return  new ResponseEntity<>(userRepository.getUserByFontionId(id),HttpStatus.OK);
    }

    @PutMapping("/fonctions/{id}")
    public ResponseEntity<Object> update(@RequestBody Fonction fonction,@PathVariable("id") Long id){
        Optional<Fonction> optional = fonctionRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        fonction.setId(id);
        fonctionRepository.save(fonction);
        return new ResponseEntity<>(fonction,HttpStatus.OK);
    }

    @DeleteMapping("/fonctions/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            fonctionRepository.deleteById(id);
            return new ResponseEntity<>(" The feature with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
}
