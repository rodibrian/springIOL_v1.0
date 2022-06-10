package com.iol.controller.servletController;

import com.iol.repository.ArticleRepository;
import com.iol.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MenuNavController{

    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private ArticleRepository articleRepository;
    private final String CATEGORIE_LIST = "categories";
    private final String ARTICLE_LIST = "articles";

    public MenuNavController() {
    }

    @RequestMapping(
            value = {"/articles"},
            method = {RequestMethod.GET}
    )
    public ModelAndView getArticles() {
        ModelAndView modelAndView = new ModelAndView("menu-article");
        modelAndView.addObject(CATEGORIE_LIST, this.categorieRepository.findAll());
        modelAndView.addObject(ARTICLE_LIST, this.articleRepository.findAll());
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

    @RequestMapping(value = "/magasin",method = RequestMethod.GET)
    public String getMenuMagasin(){
        return "menu-magasin";
    }

    @RequestMapping(value = "/stock",method = RequestMethod.GET)
    public String getMenuStock(){
        return "menu-stock";
    }


    @RequestMapping(value = "/embarquement",method = RequestMethod.GET)
    public String getMenuEmbarquement(){
        return "menu-embarquement";
    }

    @RequestMapping(value = "/embarquement-nouveau",method = RequestMethod.GET)
    public String getNouveauEmbarquement(){
        return "nouveau-embarquement";
    }

    @RequestMapping(value = "/archivage",method = RequestMethod.GET)
    public String getMenuArchivage(){
        return "menu-archivage";
    }

    @RequestMapping(value = "/autorisation",method = RequestMethod.GET)
    public String getMenuAutorisation(){
        return "menu-autorisation";
    }

    @RequestMapping(value = "/caisse",method = RequestMethod.GET)
    public String getMenuCaisse(){
        return "menu-caisse";
    }

    @RequestMapping(value = "/client",method = RequestMethod.GET)
    public String getClient(){
        return "menu-client";
    }

    @RequestMapping(value = "/fournisseur",method = RequestMethod.GET)
    public String getMenuFournisseur(){
        return "menu-fournisseur";
    }

    @RequestMapping(value = "/livraison",method = RequestMethod.GET)
    public String getMenuLivraison(){
        return "menu-livraison";
    }

    @RequestMapping(value = "/paiement",method = RequestMethod.GET)
    public String getMenuPaiement(){
        return "menu-paiement";
    }

    @RequestMapping(value = "/peremption",method = RequestMethod.GET)
    public String getMenuPeremption(){
        return "menu-peremption";
    }


    @RequestMapping(value = "/utilisateur",method = RequestMethod.GET)
    public String getMenuUtilisateur(){
        return "menu-utilisateur";
    }

    @RequestMapping(value = "/voyage",method = RequestMethod.GET)
    public String getMenuVoyage(){
        return "menu-voyage";
    }

    @RequestMapping(value = "/facture",method = RequestMethod.GET)
    public String getMenuFacture(){
        return "menu-facture";
    }

    @RequestMapping(value = "/prix",method = RequestMethod.GET)
    public String getMenuPrix(){
        return "menu-prix";
    }

    @RequestMapping(value = "/dashboard",method = RequestMethod.GET)
    public String getDashboard(){
        return "dashboard";
    }

    // menu des opérations

    @RequestMapping(value = "/operation/liste",method = RequestMethod.GET)
    public String getOperationListe(){
        return "operation/liste";
    }

    @RequestMapping(value = "/operation/entree",method = RequestMethod.GET)
    public String getOperationEntree(){
        return "operation/entree";
    }

    @RequestMapping(value = "/operation/sortie",method = RequestMethod.GET)
    public String getOperationSortie(){
        return "operation/sortie";
    }

    @RequestMapping(value = "/operation/transfert",method = RequestMethod.GET)
    public String getOperationTransfert(){
        return "operation/transfert";
    }

    @RequestMapping(value = "/operation/changer-de-code",method = RequestMethod.GET)
    public String getOperationLChangerDeCode(){
        return "operation/changer-de-code";
    }

    @RequestMapping(value = "/operation/rectification",method = RequestMethod.GET)
    public String getOperationRectification(){
        return "operation/rectification";
    }

}
