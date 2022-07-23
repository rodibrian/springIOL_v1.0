package com.iol.controller.restController;

import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class InventoryRessource {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/inventories/stores/{id}")
    public ResponseEntity<Object> getInventories(@PathVariable("id") Long id){
        return new ResponseEntity<>(articleService.getStockByMagasin(id),HttpStatus.OK);
    }

    @GetMapping("/inventories")
    public ResponseEntity<Object> getInventories(){
        return new ResponseEntity<>(articleService.getAllInventories(),HttpStatus.OK);
    }

}
