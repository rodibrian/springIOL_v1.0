package com.iol;
import com.iol.model.tenantEntityBeans.*;
import com.iol.repository.FonctionRepository;
import com.iol.repository.MagasinRepository;
import com.iol.repository.SubsidiaryRepository;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@SpringBootApplication
public class Iol{
    public static void main(String[] args) {
//        Trosa t = new Trosa();
//        t.setMontant(2L);
//        List<Trosa> t1 = List.of(t, t, t, t);
//        Stream<Long> count = t1.stream().map(Trosa::getMontant);
//        System.out.println(count);
        SpringApplication.run(Iol.class,args);
    }
}

