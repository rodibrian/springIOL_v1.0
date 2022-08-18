package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.ArticleUnite;
import com.iol.model.tenantEntityBeans.Filiale;
import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.model.wrapper.InventoryViewWrapper;
import com.iol.repository.*;
import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SubsidiaryRessource{

    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    @Autowired
    private PricesRepository pricesRepository;

    @Autowired
    private TrosaRepository trosaRepository;

    @GetMapping(value = "/subsidiaries")
    public ResponseEntity<Object> getAllSubdiaries(){
        return new ResponseEntity<>(subsidiaryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/trosa")
    public ResponseEntity<Object> getAllSubdiariesTrosa(@PathVariable("id") Long filialeId){
        return new ResponseEntity<>(trosaRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/{uniteId}/{articleId}")
    public ResponseEntity<Object> getSubdiaryProductPrice(@PathVariable("id")Long filialeId,
                                                          @PathVariable("uniteId")Long uniteId,
                                                          @PathVariable("articleId") Long articleId){
        List<PrixArticleFiliale> all = pricesRepository.findAll(uniteId, articleId, filialeId);
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleService articleService;

    @GetMapping(value = "/subsidiaries/{id}/items/{itemName}")
    public ResponseEntity<Object> getItemByName(@PathVariable("id")Long filialeId,@PathVariable("itemName")String itemName){
        List<ArticleUnite> allByItemName = articleRepository.getAllByItemName(filialeId, itemName);
        return new ResponseEntity<>(allByItemName, HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/inventories")
    public ResponseEntity<Object> getSubsidiariesInventoriesAlert(@PathVariable("id")Long filialeId){
        List<InventoryViewWrapper> subsidiaryInventoryByStoreAndItemName = articleService.getAllInventoryAlert(filialeId);
        return new ResponseEntity<>(subsidiaryInventoryByStoreAndItemName, HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/itemsInfo/{name}")
    public ResponseEntity<Object> getSubsidiariesItemsInfo(@PathVariable("id")Long filialeId
                                                          ,@PathVariable("name")String name){
        return new ResponseEntity<>(articleService.getAllItemInfoByName(filialeId,name), HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/itemsInfo")
    public ResponseEntity<Object> getSubsidiariesItemsInfo(@PathVariable("id")Long filialeId){
        return new ResponseEntity<>(articleService.getAllItemInfo(filialeId), HttpStatus.OK);
    }


    @PutMapping(value = "/subsidiaries/{id}/alerts/{article-id}/{new_quantite}")
    public ResponseEntity<Object> updateQuantiteAlert(@PathVariable("id")Long filialeId ,
                                                      @PathVariable("article-id") Long articleId
                                                     ,@RequestBody Double newValue){
        articleRepository.updateQuantiteAlert(filialeId,articleId,newValue);
        return new ResponseEntity<>("",HttpStatus.OK);
    }


    @GetMapping(value = "/subsidiaries/{id}/inventories/{itemName}")
    public ResponseEntity<Object> getSubsidiariesInventories(@PathVariable("id")Long filialeId
            , @PathVariable("itemName")String itemName){
        List<InventoryViewWrapper> subsidiaryInventoryByStoreAndItemName = articleService.getSubsidiaryInventoryByStoreAndItemName(filialeId, itemName);
        return new ResponseEntity<>(subsidiaryInventoryByStoreAndItemName, HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/prices/{itemName}")
    public ResponseEntity<Object> getPricesByItemName(@PathVariable("id")Long filialeId
            , @PathVariable("itemName")String itemName){
        List<PrixArticleFiliale> all = pricesRepository.findAllByLastDateAndItemName(filialeId,itemName);
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @GetMapping(value = "/subsidiaries/{id}/items")
    public ResponseEntity<Object> getItem(@PathVariable("id")Long filialeId){
        List<ArticleUnite> allByItemName = articleRepository.getAll(filialeId);
        return new ResponseEntity<>(allByItemName, HttpStatus.OK);
    }


    @PutMapping("/subsidiaries/{id}")
    public ResponseEntity<Object> update(@RequestBody Filiale filiale, @PathVariable(value = "id") Long id){
        Optional<Filiale> societeOptional = subsidiaryRepository.findById(id);
        if (!societeOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        filiale.setId(id);
        subsidiaryRepository.save(filiale);
        return new ResponseEntity<>(filiale, HttpStatus.OK);
    }

    @DeleteMapping("/subsidiaries/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            subsidiaryRepository.deleteById(id);
            return new ResponseEntity<>(" The subsidiary with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/subsidiaries")
    public ResponseEntity<Object> create(@RequestBody final Filiale filiale){
        Filiale filiale1 = subsidiaryRepository.save(filiale);
        return new ResponseEntity<>(filiale1, HttpStatus.CREATED);
    };
}
