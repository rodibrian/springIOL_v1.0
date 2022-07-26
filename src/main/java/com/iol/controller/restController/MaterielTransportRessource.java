package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.MaterielTransport;
import com.iol.repository.MaterielTransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class MaterielTransportRessource {

    @Autowired
    private MaterielTransportRepository materielTransportRepository;
    @GetMapping(value = "/materieltransport")
    public ResponseEntity<Object> getAllMaterielDeTransport(){
        return new ResponseEntity<>(materielTransportRepository.findAll(),HttpStatus.OK);
    }

    @PutMapping("/materieltransport/{id}")
    public ResponseEntity<Object> update(@RequestBody MaterielTransport materielTransport,@PathVariable(value = "id") Long id){
        Optional<MaterielTransport> materielTansportOptional = materielTransportRepository.findById(id);
        if (!materielTansportOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        materielTransport.setId(id);
        materielTransportRepository.save(materielTransport);
        return new ResponseEntity<>(materielTransport, HttpStatus.OK);
    }

    @DeleteMapping("/materieltransport/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            materielTransportRepository.deleteById(id);
            return new ResponseEntity<>(" The materiel de transport with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
    @PostMapping(value = "/materieltransport")
    public ResponseEntity<Object> create(@RequestBody MaterielTransport materielTransport){
        MaterielTransport save = materielTransportRepository.save(materielTransport);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    };
}
