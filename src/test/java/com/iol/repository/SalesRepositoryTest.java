package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class SalesRepositoryTest {

    @Autowired
    private SalesRepository salesRepository;

    @Test
    void findByProductName() {
    }

    @Test
    void getByProductName() {
    }

    @Test void getVentesByProductName() {
        List<Vente> riz = salesRepository.getVentesByProductName(1L,"RIZ".toLowerCase());
        assertThat(riz.size()).isEqualTo(3);
    }

    @Test void getVentesByClientName(){
        List<Vente> kael = salesRepository.getVentesByClientName(1L, "kael");
        assertThat(kael).isNotEmpty();
    }

    @Test
    void testGetVentesByProductName() {
    }

    @Test
    void testGetVentesByClientName() {
    }

    @Test
    void getSalesByStore() {
    }

    @Test
    void getSalesByBetweenDate() {
        List<Vente> salesByBetweenDate = salesRepository.getSalesByBetweenDate(1L, LocalDate.now(Clock.systemDefaultZone()),
                LocalDate.now(Clock.systemDefaultZone()));
        assertThat(salesByBetweenDate).isNotEmpty();
    }
}