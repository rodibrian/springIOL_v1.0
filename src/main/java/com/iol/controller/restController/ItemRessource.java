package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Article;
import com.iol.model.tenantEntityBeans.ArticleUnite;
import com.iol.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ItemRessource {

    private ArticleRepository articleRepository;

    @Autowired
    public ItemRessource(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
    @GetMapping(value = "/articles")
    public ResponseEntity<List<Article>> getArticles(){
        List<Article> all = articleRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping(value = "/articles/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable(name = "id")Long id){
        Optional<Article> byId = articleRepository.findById(id);
        return ResponseEntity.ok(byId.get());
    }


    @GetMapping(value = "/articles/{id}/unites")
    public ResponseEntity<Object> getAllUnites(@PathVariable("id") Long id){
        List<ArticleUnite> allUnite = articleRepository.getAllUnite(id);
        return new ResponseEntity<>(allUnite,HttpStatus.CREATED);
    }

    @GetMapping(value = "/articles/{id}/{filialeId}")
    public ResponseEntity<Object> getAllUnites(@PathVariable("id") Long id,@PathVariable("filialeId")Long filialeId){
        List<ArticleUnite> articleUnite = articleRepository.getAllUnite(id);
        return new ResponseEntity<>(articleUnite, HttpStatus.CREATED);
    }

    @GetMapping(value = "/articles/{articleId}/unites/{uniteId}/filiales/{filialeId}/prices")
    public ResponseEntity<Object> getPrix(@PathVariable("articleId") Long articleId
                                         ,@PathVariable("uniteId")Long uniteId
                                         ,@PathVariable("filialeId")Long filialeId){
        return new ResponseEntity<>(articleRepository.getPrix(articleId,uniteId,filialeId), HttpStatus.OK);
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            articleRepository.deleteById(id);
            return new ResponseEntity<>(" The item with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PutMapping("/articles/{id}/{status}")
    public ResponseEntity<Object> update(@PathVariable("id") Long id,@PathVariable("status")String status){
        Optional<Article> articleOptional = articleRepository.findById(id);
        if (!articleOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Article article = articleOptional.get();
        article.setStatus(status);
        articleRepository.save(article);
        return new ResponseEntity<>(" item status set to "+status, HttpStatus.OK);
    }

    @PostMapping("/articles")
    public ResponseEntity<Object> create(@RequestBody Article article){
        Article savedArticle = articleRepository.save(article);
        return new ResponseEntity<>(savedArticle, HttpStatus.CREATED);
    }

}
