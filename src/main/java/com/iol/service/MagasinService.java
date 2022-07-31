package com.iol.service;
import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.Vente;
import com.iol.repository.ActivityRepository;
import com.iol.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MagasinService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private SalesRepository salesRepository;

    public List<InfoArticleMagasin> findAllBetweenDate(Long magasinId,String begin,String end){
        return activityRepository.findAllBetweenDate(magasinId,parse(begin),parse(end));
    }

    public List<Vente> findAllSalesBetweenDate(Long magasinId, String begin, String end){
        return salesRepository.getSalesByBetweenDate(magasinId,parse(begin),parse(end));
    }

    private LocalDate parse(String date) {
        String[] split = date.replace("'", "").split("-");
        int year = Integer.parseInt(split[0]);
        int month = Integer.parseInt(split[1]);
        int day = Integer.parseInt(split[2]);
        return LocalDate.of(year,month,day);
    }

}
