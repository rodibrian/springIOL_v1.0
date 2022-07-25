package com.iol.controller.restController;

import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/inventories")
    public ResponseEntity<Object> updateInventories(){
        return new ResponseEntity<>(articleService.getAllInventories(),HttpStatus.OK);
    }

}
