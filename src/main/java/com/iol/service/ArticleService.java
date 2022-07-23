package com.iol.service;

import com.iol.model.wrapper.StockWrapper;
import com.iol.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired private ArticleRepository articleRepository;

    public List<String[]> findAll(){
        List<String> allArticle = articleRepository.getAll();
        List<String[]> collect = allArticle.stream().map(s -> s.split(",")).collect(Collectors.toList());
        return collect;
    }

    public List<StockWrapper> getAllInventories(){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDate();
        List<String[]> collect = stockWithPriceAndExpirationDate.stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<StockWrapper> list = new ArrayList<>();
        collect.forEach(strings -> {
           StockWrapper stockWrapper = new StockWrapper();
           stockWrapper.setArticleId(Long.getLong(strings[0]));
           stockWrapper.setUniteId(Long.getLong(strings[1]));
           stockWrapper.setMagasinId(Long.getLong(strings[2]));
            stockWrapper.setArticle(strings[3]);
            stockWrapper.setCategorie(strings[4]);
            stockWrapper.setUnite(strings[5]);
            stockWrapper.setStock(strings[6]);
            list.add(stockWrapper);
        });
        return list;
    }
    public List<StockWrapper> getStockByMagasin(Long magasinId){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDate(magasinId);
        List<String[]> collect = stockWithPriceAndExpirationDate.stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<StockWrapper> list = new ArrayList<>();
        collect.forEach(strings -> {
            StockWrapper stockWrapper = new StockWrapper();
            stockWrapper.setArticleId(Long.getLong(strings[0]));
            stockWrapper.setUniteId(Long.getLong(strings[1]));
            stockWrapper.setMagasinId(Long.getLong(strings[2]));
            stockWrapper.setArticle(strings[3]);
            stockWrapper.setCategorie(strings[4]);
            stockWrapper.setUnite(strings[5]);
            stockWrapper.setStock(strings[6]);
            list.add(stockWrapper);
        });
        return list;
    }
}
