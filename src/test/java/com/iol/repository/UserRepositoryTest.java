package com.iol.repository;

import com.iol.model.tenantEntityBeans.User;
import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {


    @Autowired
    private UserRepository userRepository;

    @Test
    void getAllUserByMagasinId1() {
        List<User> allUserByMagasinId1 = userRepository.getAllUserByMagasinId(1L);
        Assertions.assertThat(allUserByMagasinId1).isEmpty();
    }
}