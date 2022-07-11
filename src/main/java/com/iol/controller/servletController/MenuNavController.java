package com.iol.controller.servletController;

import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class MenuNavController{
    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private MagasinRepository magasinRepository;
    @Autowired
    private FonctionRepository fonctionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientFournisseurRepository clientFournisseurRepository;

    private final String CATEGORIE_LIST = "categories";
    private final String ARTICLE_LIST = "articles";
    private final String MAGASIN_LIST = "magasins";
    private final String FONCTION_LIST = "fonctions";
    private final String USER_LIST = "users";
    private final String CLIENT_FOURNISSEUR_LIST = "cfList";
    private final int CLIENT = 0;
    private final int FOURNISSEUR = 1;

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
    public ModelAndView getVentes(){
        ModelAndView modelAndView = new ModelAndView("menu-vente");
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/detail-ventes",method = RequestMethod.GET)
    public String getDetailVentes(){
        return "menu-detail-vente";
    }

    @RequestMapping(value = "/magasin",method = RequestMethod.GET)
    public ModelAndView getMenuMagasin(){
        List<Magasin> magasins = magasinRepository.findAll();
        ModelAndView modelAndView = new ModelAndView("menu-magasin");
        modelAndView.addObject(MAGASIN_LIST,magasins);
        return modelAndView;
    }

    @RequestMapping(value = "/stock",method = RequestMethod.GET)
    public String getMenuStock(){
        return "menu-stock";
    }


    @RequestMapping(value = "/embarquement",method = RequestMethod.GET)
    public String getMenuEmbarquement(){
        return "embarquement/menu-embarquement";
    }

    @RequestMapping(value = "/embarquement-nouveau",method = RequestMethod.GET)
    public String getNouveauEmbarquement(){
        return "embarquement/nouveau-embarquement";
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
    public ModelAndView getClient(){
        ModelAndView modelAndView = new ModelAndView("menu-client");
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST,clientFournisseurRepository.getAllExternalEntities(CLIENT));
        return modelAndView;
    }

    @RequestMapping(value = "/fournisseur",method = RequestMethod.GET)
    public ModelAndView getMenuFournisseur(){
        ModelAndView modelAndView = new ModelAndView("menu-fournisseur");
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST,clientFournisseurRepository.getAllExternalEntities(FOURNISSEUR));
        return modelAndView;
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
    public ModelAndView getMenuUtilisateur(){
        ModelAndView modelAndView = new ModelAndView("menu-utilisateur");
        modelAndView.addObject(FONCTION_LIST,fonctionRepository.findAll());
        modelAndView.addObject(USER_LIST,userRepository.findAll());
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        return modelAndView ;
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
    public ModelAndView getOperationEntree(){
        List<Magasin> magasins = magasinRepository.findAll();
        ModelAndView modelAndView = new ModelAndView("operation/entree");
        modelAndView.addObject(ARTICLE_LIST, this.articleRepository.findAll());
        modelAndView.addObject(MAGASIN_LIST,magasins);
        return modelAndView;
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
