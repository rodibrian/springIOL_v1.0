package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Supply;
import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.repository.SupplyRepository;
import com.iol.repository.InfoArticleMagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SupplyRessource {

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private InfoArticleMagasinRepository iamRepository;

    @GetMapping(value = "/supplies")
    public ResponseEntity<Object> getAllUnites(){
        return new ResponseEntity<>(supplyRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/supplies/{id}")
    public ResponseEntity<Object> update(@RequestBody Supply approv, @PathVariable(value = "id") Long id){
        Optional<Supply> optional = supplyRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        approv.setId(id);
        supplyRepository.save(approv);
        return new ResponseEntity<>(approv, HttpStatus.OK);
    }

    @DeleteMapping("/supplies/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            supplyRepository.deleteById(id);
            return new ResponseEntity<>(" The supply with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/supplies")
    public ResponseEntity<Object> create(@RequestBody List<InfoArticleMagasin> infoArticleMagasins){
        List<InfoArticleMagasin> infoArticleMagasins1 = iamRepository.saveAll(infoArticleMagasins);
        return new ResponseEntity<>(infoArticleMagasins1, HttpStatus.CREATED);
    };
}
