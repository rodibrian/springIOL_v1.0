package com.iol.controller.restController;


import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeOperationCaisse;
import com.iol.model.tenantEntityBeans.Fonction;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.model.wrapper.IfcWrapper;
import com.iol.repository.CashRepository;
import com.iol.repository.IfcRepository;
import com.iol.service.CashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ifcRessource {

    @Autowired private IfcRepository ifcRepository;

    @Autowired private CashRepository cashRepository;

    @PostMapping("/ifc")
    public ResponseEntity<Object> create(@RequestBody InfoFilialeCaisse infoFilialeCaisse){
        return new ResponseEntity<>(ifcRepository.save(infoFilialeCaisse),HttpStatus.OK);
    }

    @GetMapping("/ifc/{filiale-id}/{filter-type}/{type}")
    public ResponseEntity<Object> getIfcByFilialeAndType(@PathVariable("filter-type") String filterType,
                                                         @PathVariable("type") String type,
                                                         @PathVariable("filiale-id")Long filialeId){
        List<InfoFilialeCaisse> allByTypePayement = new ArrayList<>();
        if (filterType.equals("MODE-PAYEMENT")) allByTypePayement = cashRepository.findAllByTypePayement(filialeId,ModePayement.string2TypePayement(type),LocalDate.now(Clock.systemDefaultZone()));
        else allByTypePayement = cashRepository.findAllByTypeOperation(filialeId,TypeOperationCaisse.string2Operation(type), LocalDate.now(Clock.systemDefaultZone()));
        return new ResponseEntity<>(allByTypePayement,HttpStatus.OK);
    }

    private LocalDate parse(String date){
        String[] split = date.replace("'", "").split("-");
        int year = Integer.parseInt(split[0]);
        int month = Integer.parseInt(split[1]);
        int day = Integer.parseInt(split[2]);
        return LocalDate.of(year,month,day);
    }

    @GetMapping("/ifc/{filiale-id}/date/{begin}/{end}")
    public ResponseEntity<Object> getIfcByFilialeAndType(@PathVariable("filiale-id")Long filialeId,
                                                         @PathVariable("begin") String begin,
                                                         @PathVariable("end") String end){
        List<InfoFilialeCaisse> allBetweenDate = cashRepository.findAllBetweenDate(filialeId, parse(begin), parse(end));
        return new ResponseEntity<>(allBetweenDate,HttpStatus.OK);
    }

    @PutMapping("/ifc/{vente-id}")
    public ResponseEntity<Object> update(@RequestBody IfcWrapper ifcWrapper,@PathVariable("vente-id") Long venteId){
        ifcRepository.update(venteId,ifcWrapper.getModePayement(),ifcWrapper.getDescription());
        return new ResponseEntity<>("",HttpStatus.OK);
    }


}


