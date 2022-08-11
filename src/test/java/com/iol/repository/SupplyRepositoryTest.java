package com.iol.repository;

import com.iol.model.tenantEntityBeans.Supply;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SupplyRepositoryTest {

    @Autowired
    private SupplyRepository supplyRepository;

    @Test
    void getBySellByDate() {
        List<Supply> bySellByDate = supplyRepository.getBySellByDate(1L);
        assertTrue(!bySellByDate.isEmpty());
    }
}