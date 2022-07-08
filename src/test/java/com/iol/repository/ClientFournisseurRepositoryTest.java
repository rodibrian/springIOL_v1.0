package com.iol.repository;

import com.iol.model.entityEnum.TypeCf;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

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
        Assertions.assertThat(cfRepo.getAllExternalEntities(TypeCf.CLIENT)).isNotNull();
    }
}