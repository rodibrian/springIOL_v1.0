package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class VenteRessource {

    @Autowired
    private VenteRepository venteRepository;

    @GetMapping("/ventes")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(venteRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/ventes")
    public ResponseEntity<Object> create(@RequestBody Vente vente){
        Vente save = venteRepository.save(vente);
        return new ResponseEntity<>(save,HttpStatus.OK);
    }

    @PutMapping("/ventes/{id}")
    public ResponseEntity<Object> update(@RequestBody Vente vente,@PathVariable("id") Long id){
        Optional<Vente> optional = venteRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        vente.setId(id);
        venteRepository.save(vente);
        return new ResponseEntity<>(vente,HttpStatus.OK);
    }

    @DeleteMapping("/ventes/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            venteRepository.deleteById(id);
            return new ResponseEntity<>(" La vente avec l'id ="+id+" est supprimer avec succes",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

}
