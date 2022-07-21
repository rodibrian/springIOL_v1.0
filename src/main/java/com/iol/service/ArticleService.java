package com.iol.service;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.repository.ArticleRepository;
import com.iol.repository.InfoArticleMagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    @Autowired private ArticleRepository articleRepository;
    @Autowired private InfoArticleMagasinRepository infoArticleMagasinRepository;
    public List<String[]> findAll(){
        List<String> allArticle = articleRepository.getAllArticle();
        List<String[]> collect = allArticle.stream().map(s -> s.split(",")).collect(Collectors.toList());
        return collect;
    }

    public List<InfoArticleMagasin> getAllStock(){
        List<InfoArticleMagasin> all = infoArticleMagasinRepository.findAll();
        return all;
    }
}
