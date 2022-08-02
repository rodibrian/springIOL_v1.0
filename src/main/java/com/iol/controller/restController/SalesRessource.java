package com.iol.controller.restController;
import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.ArticleRepository;
import com.iol.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SalesRessource {
    @Autowired private SalesRepository salesRepository;
    @Autowired private ArticleRepository articleRepository;

    @GetMapping("/sales")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(salesRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/sales/{reference}")
    public ResponseEntity<Object> getAll(@PathVariable("reference")String reference){
        List<Vente> billDetails = salesRepository.getBillDetails(reference);
        return new ResponseEntity<>(billDetails, HttpStatus.OK);
    }

    @PostMapping("/sales")
    public ResponseEntity<Object> create(@RequestBody List<Vente> ventes){
        List<Vente> ventes1 = salesRepository.saveAll(ventes);
        return new ResponseEntity<>(ventes1,HttpStatus.OK);
    }

    @PutMapping("/sales/{id}")
    public ResponseEntity<Object> update(@RequestBody Vente vente, @PathVariable("id") Long id){
        Optional<Vente> optional = salesRepository.findById(id);
        if (!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        vente.setId(id);
        salesRepository.save(vente);
        return new ResponseEntity<>(vente,HttpStatus.OK);
    }

    @DeleteMapping("/sales/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            salesRepository.deleteById(id);
            return new ResponseEntity<>(" La vente avec l'id ="+id+" est supprimer avec succes",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
}