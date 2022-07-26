package com.iol.controller.restController;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.repository.MagasinRepository;
import com.iol.repository.UserRepository;
import com.iol.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class MagasinRessource {

    private MagasinRepository magasinRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    @Autowired
    public void setMagasinRepository(MagasinRepository magasinRepository) {
        this.magasinRepository = magasinRepository;
    }

    @GetMapping("/magasins")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(magasinRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/magasins/{id}/users")
    public ResponseEntity<Object> getAllUser(@PathVariable("id")Long id){
        Optional<Magasin> optionalMagasin = magasinRepository.findById(id);

        if (!optionalMagasin.isPresent()) return new ResponseEntity<>(" Le magasin avec l'id "+id+" n'existe pas dans la base de donné", HttpStatus.NOT_FOUND);
        Magasin magasin = optionalMagasin.get();
        return new ResponseEntity<>(userRepository.getAllUserByMagasinId(id),HttpStatus.OK);
    }

    @GetMapping("/magasins/{id}")
    public ResponseEntity<Object> getMagasin( @PathVariable("id")Long id){
        Optional<Magasin> optionalMagasin = magasinRepository.findById(id);
        if (!optionalMagasin.isPresent()) return new ResponseEntity<>(" Le magasin avec l'id "+id+" n'existe pas dans la base de donné", HttpStatus.NOT_FOUND);
        Magasin magasin = optionalMagasin.get();
        return new ResponseEntity<>(magasin,HttpStatus.OK);
    }

    @GetMapping("/magasins/{id}/filiales")
    public ResponseEntity<Object> getMagasinBy(@PathVariable("id") Long id){
        return new ResponseEntity<>(magasinRepository.getById(id).getFiliale(), HttpStatus.OK);
    }

    @GetMapping("/magasins/{id}/stocks")
    public ResponseEntity<Object> getStocksBy(@PathVariable("id") Long id){
        return new ResponseEntity<>(articleService.getStockByMagasin(id), HttpStatus.OK);
    }


    @PostMapping("/magasins")
    public ResponseEntity<Object> create(@RequestBody Magasin magasin){
        Magasin save = magasinRepository.save(magasin);
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }

    @PutMapping("/magasins/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Long id,@RequestBody Magasin magasin){
        Optional<Magasin> optionalMagasin = magasinRepository.findById(id);
        if (!optionalMagasin.isPresent()){
            return ResponseEntity.notFound().build();
        }
        magasin.setId(id);
        magasinRepository.save(magasin);
        return new ResponseEntity<>(magasin, HttpStatus.OK);
    }

    @DeleteMapping("/magasins/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        try{
            magasinRepository.deleteById(id);
            return new ResponseEntity<>(" Le magasin avec l'id = "+id+" est supprimer avec succes ",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
        }
    }
}
