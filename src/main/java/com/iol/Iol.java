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
public class Iol implements CommandLineRunner {

    @Autowired
    private MagasinRepository magasinRepository;
    @Autowired
    private SubsidiaryRepository subsidiaryRepository;

    public static void main(String[] args) {
         SpringApplication.run(Iol.class,args);
    }

    @Override
    public void run(String... args) throws Exception {

        Fonctionnalite fonctionnalite = new Fonctionnalite();
        fonctionnalite.setNom(" All ");

        Fonction fonction = new Fonction();
        fonction.setCode("54456");
        fonction.setFonctionnalites(Set.of(fonctionnalite));
        fonction.setNom(" Dev full stack java ");

        User user = new User();
        user.setUsername(" kael ");
        user.setPassword(" kael ");
        user.setFonction(fonction);

        Magasin magasin = new Magasin();
        magasin.setNomMagasin(" Manantsoa ");
        magasin.setAdresse("Morafeno");
        magasin.setUsers(Set.of(user));

        Filiale filiale = new Filiale();
        filiale.setNom(" Manantsoa Morafeno ");
        filiale.setAdresse(" Morafeno ");
        filiale.setMagasins(Set.of(magasin));

        subsidiaryRepository.save(filiale);
    }

}

