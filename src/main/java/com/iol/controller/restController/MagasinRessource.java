package com.iol.controller.restController;
import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.ActivityRepository;
import com.iol.repository.MagasinRepository;
import com.iol.repository.SalesRepository;
import com.iol.repository.UserRepository;
import com.iol.service.ArticleService;
import com.iol.service.MagasinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.spi.DateFormatProvider;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class MagasinRessource {

    private MagasinRepository magasinRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    @Autowired private ActivityRepository activityRepository;

    @Autowired
    private MagasinService magasinService;

    @Autowired
    private SalesRepository salesRepository;

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

    @GetMapping("/magasins/{id}/activities")
    public ResponseEntity<Object> getAllActivities(@PathVariable("id")Long id){
        List<InfoArticleMagasin> allByMagasin = activityRepository.findAllByMagasin(id);
        return new ResponseEntity<>(allByMagasin,HttpStatus.OK) ;
    }

    @GetMapping("/magasins/{id}/sales/{type}/{name}")
    public ResponseEntity<Object> getAllSalesByName(@PathVariable("id")Long id,
                                                    @PathVariable("type") String type,
                                                    @PathVariable("name") String name){
       List<Vente> list = type.equals("CLIENT") ?
                salesRepository.getVentesByClientName(id,name):
                salesRepository.getVentesByProductName(id,name);
        return new ResponseEntity<>(list,HttpStatus.OK) ;
    }

    @GetMapping("/magasins/{id}/sales")
    public ResponseEntity<Object> getStoreSales(@PathVariable("id")Long id){
        return new ResponseEntity<>(salesRepository.getSalesByStore(id),HttpStatus.OK) ;
    }

    @GetMapping("/magasins/{id}/sales/{type}/{begin}/{end}")
    public ResponseEntity<Object> getAllSalesByDate(@PathVariable("id")Long id,
                                                    @PathVariable("type") String type,
                                                    @PathVariable("begin") String begin,
                                                    @PathVariable("end") String end){
        if (type.equals("DATE")) return new ResponseEntity<>(magasinService.findAllSalesBetweenDate(id,begin,end),HttpStatus.OK);
        return new ResponseEntity<>("",HttpStatus.OK) ;
    }




    @GetMapping("/magasins/{id}/activities/{date}")
    public ResponseEntity<Object> getAllActivitiesByDate(@PathVariable("id")Long id, @PathVariable("date")LocalDate localDate){
        List<InfoArticleMagasin> allByMagasin = activityRepository.findAllByDate(id,localDate);
        return new ResponseEntity<>(allByMagasin,HttpStatus.OK) ;
    }



    @GetMapping("/magasins/{id}/activities/{beginDate}/{endDate}")
    public ResponseEntity<Object> getAllActivitiesByDate(@PathVariable("id")Long id,
                                                         @PathVariable("beginDate")String begin,
                                                         @PathVariable("endDate")String end){
        List<InfoArticleMagasin> allBetweenDate = magasinService.findAllBetweenDate(id, begin, end);
        return new ResponseEntity<>(allBetweenDate,HttpStatus.OK) ;
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
