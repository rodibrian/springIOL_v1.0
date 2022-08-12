package com.iol.controller.restController;


import com.iol.repository.ArticleRepository;
import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1")
public class ExpirationRessource{

    private ArticleService articleService;

    @GetMapping(value = "/expirations/{filiale-id}/{product-name}")
    public ResponseEntity<Object> getExpirationByProductName(@PathVariable("filiale-id")Long filialeId,
                                                          @PathVariable("product-name")String name){
        return new ResponseEntity<>(articleService.getProductByExpirationByProductName(name,filialeId), HttpStatus.OK);
    }

    @GetMapping(value = "/expirations/{filiale-id}/status/{status}")
    public ResponseEntity<Object> getExpirationByStatus(@PathVariable("filiale-id")Long filialeId,
                                                          @PathVariable("status")String name){
        return new ResponseEntity<>(articleService.getProductByExpirationByStatus(name,filialeId), HttpStatus.OK);
    }

    @PutMapping(value = "/expirations/{magasinId}/{articleId}/{uniteId}/{new-date}/{old-date}")
    public ResponseEntity<Object> getExpirationByStatus(@PathVariable("magasinId")Long magasinId,
                                                        @PathVariable("articleId")Long articleId,
                                                        @PathVariable("uniteId")Long uniteId,
                                                        @PathVariable("new-date")LocalDate newDate,
                                                        @PathVariable("old-date")LocalDate oldDate){

        return new ResponseEntity<>("",HttpStatus.OK);
    }

    @Autowired
    public void setArticleService(ArticleService articleService) {
        this.articleService = articleService;
    }
}
