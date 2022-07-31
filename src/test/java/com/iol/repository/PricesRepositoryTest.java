package com.iol.repository;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PricesRepositoryTest {

    @Autowired
    private PricesRepository pricesRepository;

    @Test
    void findAllByLastDate() {
        List<PrixArticleFiliale> allByLastDate = pricesRepository.findAllByLastDate();
        assertThat(allByLastDate.size()).isEqualTo(2);
    }

    @Test
    void findAll() {
        List<PrixArticleFiliale> all = pricesRepository.findAll(2L, 1L, 7L);
        assertThat(all.size()).isEqualTo(10);
    }

    @Test
    void testFindAllByLastDate() {
    }

    @Test
    void testFindAll() {
    }
}