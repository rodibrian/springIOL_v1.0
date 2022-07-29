package com.iol.repository;

import com.iol.model.tenantEntityBeans.Vente;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;

@SpringBootTest
class VenteRepositoryTest {


    @Autowired
    private VenteRepository venteRepository;

    @Test
    void findByProductName() {
        Set<Vente> riz = venteRepository.getByProductName("RIZ");
        Assertions.assertThat(riz).isNotEmpty();
    }
}