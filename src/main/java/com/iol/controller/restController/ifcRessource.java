package com.iol.controller.restController;


import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.repository.IfcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ifcRessource {
    @Autowired
    private IfcRepository ifcRepository;
    @PostMapping("/ifc")
    public ResponseEntity<Object> create(@RequestBody InfoFilialeCaisse infoFilialeCaisse){
        return new ResponseEntity<>(ifcRepository.save(infoFilialeCaisse),HttpStatus.OK);
    }
}
