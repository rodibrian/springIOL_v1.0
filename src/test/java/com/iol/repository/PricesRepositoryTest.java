package com.iol.repository;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PricesRepositoryTest {

    @Autowired
    private PricesRepository pricesRepository;

    @Test
    void findAllByLastDate() {
        List<PrixArticleFiliale> allByLastDate = pricesRepository.findAllByLastDate();
        Assertions.assertThat(allByLastDate).isNotNull();
       allByLastDate.forEach(System.out::println);
    }

}