package com.iol.controller.restController;

import com.iol.model.tenantEntityBeans.Avoir;
import com.iol.repository.InvoiceRegulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class InvoiceRegulationResource {

    private InvoiceRegulationRepository invoiceRegulationRepository;

    @PostMapping(value = "/regulations")
    public ResponseEntity<Object> create(@RequestBody Avoir invoiceRegulation){
        return new ResponseEntity<>(invoiceRegulationRepository.save(invoiceRegulation), HttpStatus.CREATED);
    };

    @Autowired
    public void setInvoiceRegulationRepository(InvoiceRegulationRepository invoiceRegulationRepository) {
        this.invoiceRegulationRepository = invoiceRegulationRepository;
    }
}
