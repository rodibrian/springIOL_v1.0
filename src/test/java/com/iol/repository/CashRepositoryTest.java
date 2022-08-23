package com.iol.repository;

import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeOperationCaisse;
import com.iol.service.CashService;
import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Clock;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CashRepositoryTest{

    @Autowired
    private CashService cashService;
    @Autowired
    private CashRepository cashRepository;

    @Test void findByTypePayement() {
        Map<String, Double> cashInfo = cashService.getCashInfo(1L);
        assertThat(cashInfo).isEmpty();
    }

    @Test
    void testFindByTypePayement() {
        Double sumEspece = cashRepository.findByTypePayement(ModePayement.ESPECE, LocalDate.now()).orElse(0.0);
        assertThat(sumEspece).isNotZero();
    }

    @Test
    void findByOperationType() {
    }

    @Test
    void findByOperationTypeBetweenDate() {
        LocalDate now = LocalDate.now(Clock.systemDefaultZone());
        Optional<Double> vente = cashRepository.findByOperationTypeBetweenDate(TypeOperationCaisse.VENTE, now, now);
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

}