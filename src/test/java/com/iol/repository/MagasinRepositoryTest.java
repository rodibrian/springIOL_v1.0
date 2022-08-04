package com.iol.repository;

import com.iol.model.tenantEntityBeans.Magasin;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MagasinRepositoryTest {

    @Autowired
    private MagasinRepository magasinRepository;

    @Test
    void findAllByFiliale() {
        List<Magasin> allByFiliale = magasinRepository.findAllByFiliale(1L);
        Assertions.assertThat(allByFiliale.size()).isEqualTo(1);
    }
}