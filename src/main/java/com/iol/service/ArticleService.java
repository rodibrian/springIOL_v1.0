package com.iol.service;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.wrapper.InventoryViewWrapper;
import com.iol.model.wrapper.InventoryWrapper;
import com.iol.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService{

    @Autowired private ArticleRepository articleRepository;

    public List<InventoryViewWrapper> getAllInventories(){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDateByItemName();
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public List<InventoryViewWrapper> getAllInventories(Long filialeId){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getSubsidiaryInventoryWithPriceAndExpirationDate(filialeId);
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public List<InventoryViewWrapper> getAllInventoryAlert(Long filialeId){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getSubsidiaryInventoryAlert(filialeId);
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public List<InventoryViewWrapper> getInventoryByStore(Long magasinId){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDateByItemName(magasinId);
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public List<InventoryViewWrapper> getInventoryByStoreAndItemName(Long magasinId,String name){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getStockWithPriceAndExpirationDateByItemName(magasinId,name);
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public List<InventoryViewWrapper> getSubsidiaryInventoryByStoreAndItemName(Long filialeId,String name){
        List<String> stockWithPriceAndExpirationDate = articleRepository.getSubsidiaryInventoryWithPriceAndExpirationDateByItemName(filialeId,name);
        List<InventoryViewWrapper> list = createInventoryViewWrappers(stockWithPriceAndExpirationDate);
        return list;
    }

    public InfoArticleMagasin updateInventory(InfoArticleMagasin[] infoArticleMagasinTab){
        Double sum = 0D;
        for (InfoArticleMagasin iam : infoArticleMagasinTab){
            Long articleId = iam.getArticle().getId();
            Long uniteId = iam.getUnite().getId();
            Double quantiteNiveau = articleRepository.getQuantiteNiveau(uniteId, articleId);
            Double quantiteAjout = iam.getQuantiteAjout();
            sum+=(quantiteAjout*quantiteNiveau);
        }
        InfoArticleMagasin infoArticleMagasin = infoArticleMagasinTab[0];
        infoArticleMagasin.setQuantiteAjout(sum);
        return infoArticleMagasin;
    }


    private List<InventoryViewWrapper> createInventoryViewWrappers(List<String> stockWithPriceAndExpirationDate ) {
        List<InventoryViewWrapper> list = new ArrayList<>();
        List<String[]> collect = stockWithPriceAndExpirationDate.stream().map(s -> s.split(",")).collect(Collectors.toList());
        collect.forEach(strings -> {
            InventoryViewWrapper inventoryViewWrapper = new InventoryViewWrapper();
            inventoryViewWrapper.setArticleId(Long.valueOf(strings[0]));
            inventoryViewWrapper.setUniteId(Long.valueOf(strings[1]));
            inventoryViewWrapper.setMagasinId(Long.valueOf(strings[2]));
            inventoryViewWrapper.setArticle(strings[3]);
            inventoryViewWrapper.setCategorie(strings[4]);
            inventoryViewWrapper.setUnite(strings[5]);
            inventoryViewWrapper.setQuantite(Double.valueOf(strings[6]));
            inventoryViewWrapper.setNomMagasin(strings[7]);
            System.out.println(inventoryViewWrapper);
            list.add(inventoryViewWrapper);
        });
        return list;
    }

    public List<String[]> processUniteAndNiveau(Long articleId){
        return articleRepository.getAllUniteAndNiveau(articleId).stream().map(s -> s.split(",")).collect(Collectors.toList());
    }

    public void persistInventorieData(InventoryWrapper wrapper){
        Long uniteId = wrapper.getUniteId();
        Long articleId = wrapper.getArticleId();
        Long magasinId = wrapper.getMagasinId();
        Double supplyQuantite = wrapper.getQuantite();
        Double quantiteNiveau = 0D;
        List<String[]> strings = processUniteAndNiveau(articleId);
        for (String[] value : strings) {
            Long uId = Long.getLong(value[0]);
            if (uniteId==uId){
                quantiteNiveau = Double.valueOf(value[1]);
                int niveau = Integer.parseInt(value[1]);
                if (niveau==1){
                    // CONVERTIR LA QUANTITE A LA NIVEAU
                    Double stockQuantite = supplyQuantite*quantiteNiveau;
                    int stockCount = articleRepository.getStockCount(uId,magasinId, articleId);
                    if (stockCount==0){ articleRepository.saveInventory(uId, magasinId, articleId,stockQuantite);
                    }else articleRepository.updateStock(stockQuantite,uId,magasinId,articleId);
                }
            }
        }
    }
}
