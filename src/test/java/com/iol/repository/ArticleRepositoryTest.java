package com.iol.repository;

import com.iol.model.tenantEntityBeans.ArticleUnite;
import com.iol.service.ArticleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

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
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDateByItemName(1L);
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

    @Test
    void getAllNotDeletedAndNotHidden() {
        List<ArticleUnite> allNotDeletedAndNotHidden = articleRepository.getAllNotDeletedAndNotHidden();
        assertThat(allNotDeletedAndNotHidden).isEmpty();
    }

    @Test
    void testGetAll1() {
        List<ArticleUnite> all = articleRepository.getAll();
        assertThat(all).isNotEmpty();
    }

    @Test
    void getAllByItemName() {
        List<ArticleUnite> riz = articleRepository.getAllByItemName("RIZ");
        assertThat(riz).isNotEmpty();
    }

    @Test
    void getProductexpiration() {
        List<String> productexpiration = articleRepository.getProductExpiration(1L);
        assertThat(productexpiration.size()).isEqualTo(3);
    }

    @Test
    void getProductExpirationByProductName() {
        List<String> riz = articleRepository.getProductExpirationByProductName("fil", 1L);
        assertThat(riz).isNotEmpty();
        System.out.println(riz);
    }

    @Test
    void updateExpirationDate() {
      //  articleRepository.updateExpirationDate(1L,1L,2L, LocalDate.now(),LocalDate.of(2022,8,11));
    }

    @Test
    void updateQuantiteAlert() {
        articleRepository.updateQuantiteAlert(1L,1L,5D);
    }

    @Test
    void getProductExpirationByStore() {
        List<String> productExpirationByStore = articleRepository.getProductExpirationByStore(2L);
        assertThat(productExpirationByStore).isNotEmpty();
    }

    @Test
    void getSubsidiaryItemInfo() {
        List<String> subsidiaryItemInfo = articleRepository.getSubsidiaryItemInfo(1L, 1L);
        assertThat(subsidiaryItemInfo.size()).isEqualTo(2);
        System.out.println(subsidiaryItemInfo);
    }
}