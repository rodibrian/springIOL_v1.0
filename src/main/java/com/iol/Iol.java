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

import java.util.Set;

@SpringBootApplication
public class Iol{
    public static void main(String[] args) {
         SpringApplication.run(Iol.class,args);
    }
}

