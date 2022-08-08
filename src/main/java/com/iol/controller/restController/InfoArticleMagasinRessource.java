package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.repository.ArticleRepository;
import com.iol.repository.InfoArticleMagasinRepository;
import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/api/v1")
public class InfoArticleMagasinRessource {
    @Autowired
    private InfoArticleMagasinRepository infoArticleMagasinRepository;

    @Autowired
    private ArticleService articleService;

    @PostMapping("/info")
    public ResponseEntity<Object> create(@RequestBody InfoArticleMagasin [] infoArticleMagasinTab){
        InfoArticleMagasin infoArticleMagasin = articleService.updateInventory(infoArticleMagasinTab);
        return new ResponseEntity<>(infoArticleMagasinRepository.save(infoArticleMagasin), HttpStatus.OK);
    }
}
