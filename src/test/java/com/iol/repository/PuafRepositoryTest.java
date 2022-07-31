package com.iol.repository;

import com.iol.model.entityEmbededId.PrixVenteUniteArticleFilialeId;
import com.iol.model.tenantEntityBeans.*;
import com.iol.service.ArticleService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@SpringBootTest
class PuafRepositoryTest {

    @Autowired
    private PuafRepository puafRepository;

    @Autowired
    private ArticleService service;


    @Test
    void create() {

//        EntityManagerFactory nativeEntityManagerFactory = entityManagerFactory.getNativeEntityManagerFactory();
//        EntityManager entityManager = nativeEntityManagerFactory.createEntityManager();

        PrixVenteUniteArticleFilialeId puafid = new PrixVenteUniteArticleFilialeId();
        puafid.setFilialeId(1L);
        puafid.setUniteId(1L);
        puafid.setArticleId(1L);

        PrixArticleFiliale puaf = new PrixArticleFiliale();

        Article article = new Article();
        article.setId(1L);

        Unite unite = new Unite();
        unite.setId(1L);

        Filiale filiale = new Filiale();
        filiale.setId(1L);

        User user = new User();
        user.setId(1L);
        user.setUsername("kael");
        user.setPassword("kael");

//        puaf.setPrixVenteUniteArticleFilialeId(puafid);
        puaf.setDateEnregistrement(Date.from(Instant.now()));
        puaf.setPrixVente(1000D);
        puaf.setUser(user);
        puaf.setFiliale(filiale);
        puaf.setUnite(unite);
        puaf.setArticle(article);

        puafRepository.save(puaf);
    }

    @Test
    void getAllStock() {
//        Assertions.assertThat(service.getAllStock()).isNotEmpty();
    }
}