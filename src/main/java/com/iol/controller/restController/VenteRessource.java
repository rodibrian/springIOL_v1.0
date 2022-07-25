package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.ArticleUnite;
import com.iol.model.tenantEntityBeans.Unite;
import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.ArticleRepository;
import com.iol.repository.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class VenteRessource {
    @Autowired
    private VenteRepository venteRepository;


    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("/ventes")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(venteRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/ventes")
    public ResponseEntity<Object> create(@RequestBody List<Vente> ventes){
        List<Vente> ventes1 = venteRepository.saveAll(ventes);
        ventes1.forEach(vente -> {
            Long articleId = vente.getArticle().getId();
            Unite unite = vente.getUnite();
            Long uniteId = unite.getId();
            Double quantiteNiveau = articleRepository.getQuantiteNiveau(uniteId, articleId);
            Long primaryUniteId = articleRepository.getPrimaryUniteId(articleId);
            Long magasinId = vente.getMagasin().getId();
            Double venteQuantite = vente.getQuantite();
            // CONVERTIR LA QUANTITE A LA NIVEAU
            Double stockQuantite = venteQuantite*quantiteNiveau;
            System.out.println("articleId = "+articleId+",uniteId = "+primaryUniteId+" , magasinId = "+magasinId+", quantite = "+stockQuantite);
            articleRepository.updateStock(-stockQuantite,primaryUniteId,magasinId,articleId);
        });
        return new ResponseEntity<>(ventes1,HttpStatus.OK);
    }

    @PutMapping("/ventes/{id}")
    public ResponseEntity<Object> update(@RequestBody Vente vente,@PathVariable("id") Long id){
        Optional<Vente> optional = venteRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        vente.setId(id);
        venteRepository.save(vente);
        return new ResponseEntity<>(vente,HttpStatus.OK);
    }

    @DeleteMapping("/ventes/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            venteRepository.deleteById(id);
            return new ResponseEntity<>(" La vente avec l'id ="+id+" est supprimer avec succes",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
}