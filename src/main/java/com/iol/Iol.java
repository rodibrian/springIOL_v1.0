package com.iol;

import com.iol.model.entityBeans.Fonction;
import com.iol.model.entityBeans.Fonctionnalite;
import com.iol.model.entityBeans.User;
import com.iol.model.entityEnum.Sexe;
import com.iol.model.entityEnum.SituationMatrimoniale;
import com.iol.repository.UserRepository;
import org.apache.tomcat.util.descriptor.web.JspPropertyGroup;
import org.apache.tomcat.util.descriptor.web.JspPropertyGroupDescriptorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.descriptor.JspConfigDescriptor;
import javax.servlet.descriptor.JspPropertyGroupDescriptor;
import java.util.Collection;
import java.util.Set;

@SpringBootApplication
public class Iol implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(Iol.class,args);
    }


    private void saveUser(){
        User user = new User();

        Fonctionnalite fonctionnalite = new Fonctionnalite();
        fonctionnalite.setNom("Dashboard");

        Fonction fonction = new Fonction();
        fonction.setNom(" Dev Full stack java ");
        fonction.setCode("78494");
        fonction.setFonctionnalites(Set.of(fonctionnalite));

        user.setSituationMatrimoniale(SituationMatrimoniale.CELIBATAIRE);
        user.setPassword("kael");
        user.setUsername("kael");
        user.setFonction(fonction);
        user.setNom("RATOMBOTIANA Armand Judicael");
        user.setCin("7464616132131561");
        user.setEmail("armandjudicaelratombotiana@gmail.com");
        user.setSexe(Sexe.MASCULIN);
        user.setNumTel("0340588519");
        userRepository.save(user);
    }

    @Override
    public void run(String... args) throws Exception {
        saveUser();
    }
}

