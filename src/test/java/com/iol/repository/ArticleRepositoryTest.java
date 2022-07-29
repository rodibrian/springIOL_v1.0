package com.iol.repository;

import com.iol.service.ArticleService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ArticleRepositoryTest{

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    void getArticleUnite() {
//        String[] allArticle = articleRepository.getAllArticle();
//        Assertions.assertThat(allArticle).isNotNull();
    }

    @Test
    void getStockWithPriceAndExpirationDate() {
        articleRepository.updateStock(20D,3L,1L,2L);
    }


    @Test
    void getAllUnite() {
    }

    @Test
    void getAll() {
    }

    @Autowired
    private ArticleService articleService;

    @Test
    void testGetStockWithPriceAndExpirationDate() {
        assertThat(articleService.getAllInventories()).isNotEmpty();
        articleService.getAllInventories().forEach(System.out::println);
    }

    @Test
    void testGetStockWithPriceAndExpirationDate1() {
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDate(1L);
        assertThat(stockWithPriceAndExpirationDate).isNotEmpty();
        stockWithPriceAndExpirationDate.forEach(System.out::println);
    }

    @Test
    void getPrix() {
    }

    @Test
    void updateStock() {
    }

    @Test
    void getStockCount() {
        int stockCount = articleRepository.getStockCount(3L, 1L, 2L);
        assertThat(stockCount).isNotZero();
    }

    @Test
    void getQuantiteNiveau() {
        Double quantiteNiveau = articleRepository.getQuantiteNiveau(3L, 2L);
    }

    @Test
    void testGetAllUnite() {
    }

    @Test
    void testGetAll() {
    }

    @Test
    void testGetStockWithPriceAndExpirationDate2() {
    }

    @Test
    void testGetPrix() {
    }

    @Test
    void testUpdateStock() {
    }

    @Test
    void testGetStockCount() {

    }

    @Test
    void testSaveInventory(){
        int i = articleRepository.saveInventory(1L, 1L, 1L, 4D);
        assertThat(i).isEqualTo(1);
    }
}