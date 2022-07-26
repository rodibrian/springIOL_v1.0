package com.iol.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ClientFournisseurRepositoryTest {

    @Autowired
    private ClientFournisseurRepository cfRepo;

    @BeforeEach
    void setUp() {
        System.out.println(" --- INIT TEST ----- ");
    }

    @Test
    void getAllFournisseur(){
        Assertions.assertThat(cfRepo.getAllExternalEntities(0).size()).isEqualTo(1);
    }
}