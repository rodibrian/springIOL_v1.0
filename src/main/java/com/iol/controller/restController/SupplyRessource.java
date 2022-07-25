package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.model.tenantEntityBeans.Supply;
import com.iol.model.tenantEntityBeans.Unite;
import com.iol.model.wrapper.SupplyWrapper;
import com.iol.repository.ArticleRepository;
import com.iol.repository.InventoryRepository;
import com.iol.repository.PuafRepository;
import com.iol.repository.SupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SupplyRessource {
    @Autowired
    private SupplyRepository supplyRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private PuafRepository puafRepository;
    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping(value = "/supplies")
    public ResponseEntity<Object> getAllUnites(){
        return new ResponseEntity<>(supplyRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/supplies/{id}")
    public ResponseEntity<Object> update(@RequestBody Supply approv, @PathVariable(value = "id") Long id){
        Optional<Supply> optional = supplyRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        approv.setId(id);
        supplyRepository.save(approv);
        return new ResponseEntity<>(approv, HttpStatus.OK);
    }

    @DeleteMapping("/supplies/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            supplyRepository.deleteById(id);
            return new ResponseEntity<>(" The supply with the id ="+id+" is deleted",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }

    @PostMapping(value = "/supplies")
    public ResponseEntity<Object> create(@RequestBody SupplyWrapper supplyWrapper){
        List<Supply> supplies1 = supplyWrapper.getSupplies();
        List<Supply> supplies = supplyRepository.saveAll(supplies1);
        List<PrixArticleFiliale> prixArticleFiliales = puafRepository.saveAll(supplyWrapper.getPrixArticleFiliales());
        supplyWrapper.setPrixArticleFiliales(prixArticleFiliales);
        supplyWrapper.setSupplies(supplies);
        supplies1.forEach(supply -> {
            Long articleId = supply.getArticle().getId();
            Unite unite = supply.getUnite();
            Long uniteId = unite.getId();
            Double quantiteNiveau = articleRepository.getQuantiteNiveau(uniteId,articleId);
            Long primaryUniteId = articleRepository.getPrimaryUniteId(articleId);
            Long magasinId = supply.getMagasin().getId();
            Double supplyQuantite = supply.getQuantite();
            // CONVERTIR LA QUANTITE A LA NIVEAU
            Double stockQuantite = supplyQuantite*quantiteNiveau;
            int stockCount = articleRepository.getStockCount(primaryUniteId,magasinId, articleId);
            System.out.println("articleId = "+articleId+",uniteId = "+primaryUniteId+" , magasinId = "+magasinId+", quantite = "+stockQuantite);
            if (stockCount==0){
               articleRepository.saveInventory(uniteId, magasinId, articleId, supplyQuantite);
            }else articleRepository.updateStock(stockQuantite,primaryUniteId,magasinId,articleId);
        });
        return new ResponseEntity<>(supplies, HttpStatus.CREATED);
    };
}
