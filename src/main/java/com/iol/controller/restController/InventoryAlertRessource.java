package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.InventoryAlert;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.repository.InventoryAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class InventoryAlertRessource {
    @Autowired
    private InventoryAlertRepository inventoryAlertRepository;

    @PostMapping("/inventories-alert")
    public ResponseEntity<Object> create(@RequestBody InventoryAlert inventoryAlert){
        InventoryAlert save = inventoryAlertRepository.save(inventoryAlert);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }
}
