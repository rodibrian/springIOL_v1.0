package com.iol.repository;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class ActivityRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;

    @Test
    void findAllByDate() {
        List<InfoArticleMagasin> allByDate = activityRepository.findAllByDate(1L,LocalDate.now());
        assertThat(allByDate).isNotEmpty();
        allByDate.forEach(System.out::println);
    }

    @Test
    void findAllBetweenData() {
        List<InfoArticleMagasin> allBetweenData = activityRepository.findAllBetweenDate(1L,LocalDate.of(2021, 1, 2), LocalDate.now(Clock.systemUTC()));
        assertThat(allBetweenData).isNotEmpty();
        allBetweenData.forEach(System.out::println);
    }

    @Test
    void findAllByMagasin(){
    }

    @Test
    void testFindAllByMagasin() {
        List<InfoArticleMagasin> allByMagasin = activityRepository.findAllByStoreId(2L);
        assertThat(allByMagasin.size()).isEqualTo(1);
    }
}