package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.ArticleUnite;
import com.iol.model.tenantEntityBeans.Filiale;
import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.repository.ArticleRepository;
import com.iol.repository.PricesRepository;
import com.iol.repository.SalesRepository;
import com.iol.repository.SubsidiaryRepository;
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

    @GetMapping(value = "/subsidiaries")
    public ResponseEntity<Object> getAllSubdiaries(){
        return new ResponseEntity<>(subsidiaryRepository.findAll(), HttpStatus.OK);
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


    @GetMapping(value = "/subsidiaries/{id}/items/{itemName}")
    public ResponseEntity<Object> getItemByName(@PathVariable("id")Long filialeId
                                                         , @PathVariable("itemName")String itemName){
        List<ArticleUnite> allByItemName = articleRepository.getAllByItemName(filialeId, itemName);
        return new ResponseEntity<>(allByItemName, HttpStatus.OK);
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
