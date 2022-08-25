package com.iol.repository;

import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeOperationCaisse;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.service.CashService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class IfcRepositoryTest {

    @Autowired
    private CashService cashService;
    @Autowired
    private IfcRepository ifcRepository;

    @Test void findByTypePayement() {
        Map<String, Double> cashInfo = cashService.getCashInfo(1L);
        assertThat(cashInfo).isEmpty();
    }

    @Test
    void testFindByTypePayement() {
        Double sumEspece = ifcRepository.findByTypePayement(1L,ModePayement.CONSOMMATION,LocalDate.now()).orElse(0.0);
        assertThat(sumEspece).isNotZero();
        System.out.println(sumEspece);
    }

    @Test
    void findByOperationType() {
    }

    @Test
    void findByOperationTypeBetweenDate() {
        LocalDate now = LocalDate.now(Clock.systemDefaultZone());
        Optional<Double> vente = ifcRepository.findByOperationTypeBetweenDate(TypeOperationCaisse.VENTE, now, now);
    }

    @Test
    void findByTypePayementBetweenDate() {
    }

    @Test
    void findAll() {
    }

    @Test
    void findAllBetweenDate() {
    }

    @Test
    void findAllByDate() {
    }

    @Test
    void findAllByTypePayement() {
    }

    @Test
    void findAllByStoreId() {
    }

    @Test
    void invoiceSum() {
    }

    @Test
    void findAllByTypeOperation() {
        List<InfoFilialeCaisse> allByTypeOperation = ifcRepository.findAllByTypeOperation(1L, TypeOperationCaisse.FACTURE, LocalDate.now());
        System.out.println(allByTypeOperation);
    }
}