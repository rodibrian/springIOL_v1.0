package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Avoir;
import com.iol.repository.InvoiceRegulationRepository;
import com.iol.service.RepoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class InvoiceRegulationResource {

    private InvoiceRegulationRepository invoiceRegulationRepository;

    @Autowired
    private RepoUtils repoUtils;

    @PostMapping(value = "/regulations")
    public ResponseEntity<Object> create(@RequestBody Avoir avoir){
        String ref = repoUtils.generateRef("AVOIR");
        avoir.setRefAvoir(ref);
        avoir.getInfoFilialeCaisse().setReference(ref);
        avoir.getInfoArticleMagasin().forEach(iam -> iam.setReference(ref));
        return new ResponseEntity<>(invoiceRegulationRepository.save(avoir), HttpStatus.CREATED);
    };

    @GetMapping(value = "/regulations/{saleId}")
    public ResponseEntity<Object> getRegulationBy(@PathVariable("saleId")Long id){
        Long count = invoiceRegulationRepository.getInvoiceBySaleId(id);
        System.out.println(count);
        return new ResponseEntity<>(count == null || count ==0 ,HttpStatus.OK);
    };

    @Autowired
    public void setInvoiceRegulationRepository(InvoiceRegulationRepository invoiceRegulationRepository) {
        this.invoiceRegulationRepository = invoiceRegulationRepository;
    }
}
