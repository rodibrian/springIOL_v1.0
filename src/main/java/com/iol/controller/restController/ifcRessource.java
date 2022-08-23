package com.iol.controller.restController;


import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.model.wrapper.IfcWrapper;
import com.iol.repository.IfcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ifcRessource {
    @Autowired
    private IfcRepository ifcRepository;
    @PostMapping("/ifc")
    public ResponseEntity<Object> create(@RequestBody InfoFilialeCaisse infoFilialeCaisse){
        return new ResponseEntity<>(ifcRepository.save(infoFilialeCaisse),HttpStatus.OK);
    }

    @PutMapping("/ifc/{vente-id}")
    public ResponseEntity<Object> update(@RequestBody IfcWrapper ifcWrapper,@PathVariable("vente-id") Long venteId){
        ifcRepository.update(venteId,ifcWrapper.getModePayement(),ifcWrapper.getDescription());
        return new ResponseEntity<>("",HttpStatus.OK);
    }

    }


