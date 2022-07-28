package com.iol.repository;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InfoArticleMagasinRepositoryTest {

    @Autowired
    private InfoArticleMagasinRepository infoArticleMagasinRepository;

    @Test
    void findAllByDate() {
    }

    @Test
    void findAllBetweenData() {
        List<InfoArticleMagasin> allBetweenData = infoArticleMagasinRepository.findAllBetweenData(LocalDate.of(2021, 1, 2), LocalDate.now(Clock.systemUTC()));
        Assertions.assertThat(allBetweenData).isNotEmpty();
        allBetweenData.forEach(System.out::println);
    }
}