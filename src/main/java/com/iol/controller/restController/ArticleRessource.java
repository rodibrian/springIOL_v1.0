package com.iol.controller.restController;

import com.iol.model.entityBeans.Article;
import com.iol.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ArticleRessource {
    private ArticleRepository articleRepository;
    @Autowired
    public ArticleRessource(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping(value = "/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("bonjour kael");
    }

    @GetMapping(value = "/articles")
    public ResponseEntity<List<Article>> getArticles(){
        List<Article> all = articleRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping("/articles")
    public ResponseEntity<Object> create(@RequestBody Article article){
        Article savedArticle = articleRepository.save(article);
        return new ResponseEntity<>(savedArticle, HttpStatus.CREATED);
    }

}
