package com.iol.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InvoiceRegulationRepositoryTest {

    @Autowired
    private InvoiceRegulationRepository invoiceRegulationRepository;
    @Test
    void getInvoiceBySalesReference() {
        Long invoiceBySalesReference = invoiceRegulationRepository.getInvoiceBySalesReference("AV-1660134380864");
        Assertions.assertThat(invoiceBySalesReference).isEqualTo(1);
    }

    @Test
    void getInvoiceBySaleId() {
        Long invoiceBySaleId = invoiceRegulationRepository.getInvoiceBySaleId(1L);
        assertEquals(1L,invoiceBySaleId);
    }
}