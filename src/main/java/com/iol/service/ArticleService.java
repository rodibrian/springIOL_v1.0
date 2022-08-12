package com.iol.service;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.wrapper.ExpirationWrapper;
import com.iol.model.wrapper.InventoryViewWrapper;
import com.iol.model.wrapper.InventoryWrapper;
import com.iol.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
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

    public List<ExpirationWrapper> getProductByExpiration(Long filialeId){
        List<String[]> collect = articleRepository.getProductExpiration(filialeId).stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<ExpirationWrapper> expirationWrapper = createExpirationWrapper(collect);
        return expirationWrapper;
    }

    public List<ExpirationWrapper> getProductByExpirationByStore(Long storeId){
        List<String[]> collect = articleRepository.getProductExpirationByStore(storeId).stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<ExpirationWrapper> list = createExpirationWrapper(collect);
        return list;
    }

    public List<ExpirationWrapper> getProductByExpirationByProductName(String name,Long filialeId){
        List<String[]> collect = articleRepository.getProductExpirationByProductName(name,filialeId).stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<ExpirationWrapper> list = createExpirationWrapper(collect);
        return list;
    }

    private final int  ONE_YEARS = 366;
    private final int TWO_YEARS = 2*ONE_YEARS;
    private final int SIX_MONTH = ONE_YEARS/2;

    public List<ExpirationWrapper> getProductByExpirationByStatus(String status,Long filialeId){
        List<String> productExpirationByStatus = createExpirationDataByStatus(status, filialeId);
        List<String[]> collect = productExpirationByStatus.stream().map(s -> s.split(",")).collect(Collectors.toList());
        List<ExpirationWrapper> list = createExpirationWrapper(collect);
        return list;
    }

    private List<String> createExpirationDataByStatus(String status, Long filialeId){
        switch (status){
            case  "Périmé" : return articleRepository.getProductExpirationByStatusExpired(filialeId,SIX_MONTH);
            case  "Faible" : return articleRepository.getProductExpirationByStatus(filialeId,SIX_MONTH,ONE_YEARS);
            case  "Moyenne": return articleRepository.getProductExpirationByStatus(filialeId, ONE_YEARS,TWO_YEARS);
            case  "Forte"  : return articleRepository.getProductExpirationByStatusStrong(filialeId,TWO_YEARS);
            default: return articleRepository.getProductExpiration(filialeId);
        }
    }

    private List<ExpirationWrapper> createExpirationWrapper(List<String[]> collect) {
        List<ExpirationWrapper> list = new ArrayList<>();
        collect.forEach(strings -> {
            ExpirationWrapper expirationWrapper = new ExpirationWrapper();
            expirationWrapper.setNomArticle(strings[0]);
            expirationWrapper.setNomUnite(strings[1]);
            expirationWrapper.setDatePeremption(strings[2]);
            expirationWrapper.setQuantitePeremetion(strings[3]);
            expirationWrapper.setMagasinId(strings[4]);
            expirationWrapper.setArticleId(strings[5]);
            expirationWrapper.setUniteId(strings[6]);
            expirationWrapper.setExpirationStatus(dayCount2ExpirationStatus(Double.valueOf(strings[7])));
            list.add(expirationWrapper);
        });
        return list;
    }

    private String dayCount2ExpirationStatus(Double count){
        if (count>TWO_YEARS) return "forte";
        if (count<SIX_MONTH) return "périmé";
        if (count> SIX_MONTH && count< ONE_YEARS) return "faible";
        if (count> ONE_YEARS && count< TWO_YEARS) return "Moyenne";
        return "";
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
