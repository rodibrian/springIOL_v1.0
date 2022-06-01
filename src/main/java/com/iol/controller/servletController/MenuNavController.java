package com.iol.controller.servletController;

import com.iol.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.Scanner;

@Controller
public class MenuNavController{

    @Autowired
    private CategorieRepository categorieRepository;

    private final String CATEGORIE_LIST = "categories";

    @RequestMapping(value = "/articles",method = RequestMethod.GET)
    public ModelAndView getArticles(){
        ModelAndView modelAndView = new ModelAndView("menu-article");
        modelAndView.addObject(CATEGORIE_LIST,categorieRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/ventes",method = RequestMethod.GET)
    public String getVentes(){
        return "menu-vente";
    }

    @RequestMapping(value = "/detail-ventes",method = RequestMethod.GET)
    public String getDetailVentes(){
        return "menu-detail-vente";
    }

    @RequestMapping(value = "/menu-magasin",method = RequestMethod.GET)
    public String getMenuMagasin(){
        return "menu-magasin";
    }

    @RequestMapping(value = "/menu-stock",method = RequestMethod.GET)
    public String getMenuStock(){
        return "menu-stock";
    }

    @RequestMapping(value = "/menu-facture",method = RequestMethod.GET)
    public String getMenuFacture(){
        return "menu-facture";
    }

    @RequestMapping(value = "/dashboard",method = RequestMethod.GET)
    public String getDashboard(){
        return "dashboard";
    }

}
