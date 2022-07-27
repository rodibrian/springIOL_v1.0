package com.iol.controller.servletController;

import com.iol.service.ArticleService;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@SessionAttributes(names = {"connectedUser","articles"})
public class MenuNavController{

    private final String CATEGORIE_LIST = "categories";
    private final String ARTICLE_LIST = "articles";
    private final String MAGASIN_LIST = "magasins";
    private final String FONCTION_LIST = "fonctions";
    private final String USER_LIST = "users";
    private final String CLIENT_FOURNISSEUR_LIST = "cfList";
    private final String STOCKS = "stocks";
    private final String SALES_LIST = "sales";

    private final String MATERIEL_TRANSPORT_LIST = "materiel_transportList";
    private final int CLIENT = 0;
    private final int FOURNISSEUR = 1;
    private final String SUPPLY_LIST = "supplies";
    private final String SUBSDIARIES = "subsdiaries";
    private final String TRANSFERT_LIST = "transferts";
    private final String ENTREE_LIST = "entres";
    private final String SORTIE_LIST = "sorties";
    private final String PRICES_LIST = "prices";
    private final String OPERATION_LIST = "operations";

    public MenuNavController() {
    }

    @RequestMapping(value = "/embarquement", method = RequestMethod.GET)
    public String getMenuEmbarquement() {
        return "embarquement/menu-embarquement";
    }


    @RequestMapping(value = "/archivage", method = RequestMethod.GET)
    public String getMenuArchivage() {
        return "menu-archivage";
    }

    @RequestMapping(value = "/autorisation", method = RequestMethod.GET)
    public String getMenuAutorisation() {
        return "menu-autorisation";
    }

    @RequestMapping(value = "/caisse", method = RequestMethod.GET)
    public String getMenuCaisse() {
        return "menu-caisse";
    }

    @RequestMapping(value = "/livraison", method = RequestMethod.GET)
    public String getMenuLivraison() {
        return "menu-livraison";
    }

    @RequestMapping(value = "/paiement", method = RequestMethod.GET)
    public String getMenuPaiement() {
        return "menu-paiement";
    }

    @RequestMapping(value = "/peremption", method = RequestMethod.GET)
    public String getMenuPeremption() {
        return "menu-peremption";
    }

    @RequestMapping(value = "/voyage", method = RequestMethod.GET)
    public String getMenuVoyage() {
        return "menu-voyage";
    }

    @RequestMapping(value = "/facture", method = RequestMethod.GET)
    public String getMenuFacture() {
        return "menu-facture";
    }

    @Autowired
    private PricesRepository pricesRepository;

    @RequestMapping(value = "/prix", method = RequestMethod.GET)
    public ModelAndView getMenuPrix() {
        ModelAndView modelAndView = new ModelAndView("menu-prix");
        modelAndView.addObject(PRICES_LIST,pricesRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/operation/changer-de-code", method = RequestMethod.GET)
    public String getOperationLChangerDeCode() {
        return "operation/changer-de-code";
    }

    @RequestMapping(value = "/operation/rectification", method = RequestMethod.GET)
    public String getOperationRectification() {
        return "operation/rectification";
    }

    @RequestMapping(value = "/client", method = RequestMethod.GET)
    public ModelAndView getClient() {
        ModelAndView modelAndView = new ModelAndView("menu-client");
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST, clientFournisseurRepository.getAllExternalEntities(CLIENT));
        return modelAndView;
    }

    @RequestMapping(value = "/fournisseur", method = RequestMethod.GET)
    public ModelAndView getMenuFournisseur() {
        ModelAndView modelAndView = new ModelAndView("menu-fournisseur");
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST, clientFournisseurRepository.getAllExternalEntities(FOURNISSEUR));
        return modelAndView;
    }

    @RequestMapping(value = "/embarquement-nouveau", method = RequestMethod.GET)
    public ModelAndView getNouveauEmbarquement() {
        ModelAndView modelAndView = new ModelAndView("embarquement/nouveau-embarquement");
        modelAndView.addObject("cfList_embarquement", clientFournisseurRepository.getAllExternalEntities(FOURNISSEUR));
        modelAndView.addObject(MATERIEL_TRANSPORT_LIST, this.materielTransportRepository.findAll());
        return modelAndView;
    }


    @RequestMapping(value = "/utilisateur",method = RequestMethod.GET)
    public ModelAndView getMenuUtilisateur(){
        ModelAndView modelAndView = new ModelAndView("menu-utilisateur");
        modelAndView.addObject(FONCTION_LIST, fonctionRepository.findAll());
        modelAndView.addObject(USER_LIST, userRepository.findAll());
        modelAndView.addObject(MAGASIN_LIST, magasinRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/operation/entree",method = RequestMethod.GET)
    public ModelAndView getOperationEntree(){
        ModelAndView modelAndView = new ModelAndView("operation/entree");
        modelAndView.addObject(ARTICLE_LIST,articleService.findAll());
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST,clientFournisseurRepository.getAllExternalEntities(FOURNISSEUR));
        return modelAndView;
    }

    @RequestMapping(value = "/operation/sortie",method = RequestMethod.GET)
    public ModelAndView getOperationSortie(){
            ModelAndView modelAndView = new ModelAndView("operation/sortie");
            modelAndView.addObject(ARTICLE_LIST,articleService.findAll());
            modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
            return modelAndView;
    }

    @RequestMapping(value = "/operation/transfert",method = RequestMethod.GET)
    public ModelAndView getOperationTransfert(){
        ModelAndView modelAndView = new ModelAndView("operation/transfert");
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        modelAndView.addObject(ARTICLE_LIST,articleService.findAll());
        return modelAndView;
    }
    /*
    Administration
     */
    @RequestMapping(value = "/admin-client/dashboard",method = RequestMethod.GET)
    public ModelAndView getAdministrationClientHome(){
        ModelAndView modelAndView = new ModelAndView("admin-client/dashboard");
        modelAndView.addObject(SUBSDIARIES,subsidiaryRepository.findAll());
        return modelAndView;
    }


    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public ModelAndView getDashboard() {
        ModelAndView modelAndView = new ModelAndView("dashboard");
        modelAndView.addObject("client_list", clientFournisseurRepository.getAllExternalEntities(CLIENT));
        modelAndView.addObject("fournisseur_list", clientFournisseurRepository.getAllExternalEntities(FOURNISSEUR));
        return modelAndView;
    }

    // menu des opérations
    @RequestMapping(value = "/operation/liste",method = RequestMethod.GET)
    public ModelAndView getOperationListe(){
        ModelAndView modelAndView = new ModelAndView("operation/liste");
        modelAndView.addObject(OPERATION_LIST,infoArticleMagasinRepository.findAll());
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(
            value = {"/articles"},
            method = {RequestMethod.GET}
    )
    public ModelAndView getArticles() {
        ModelAndView modelAndView = new ModelAndView("menu-article");
        modelAndView.addObject(CATEGORIE_LIST, this.categorieRepository.findAll());
        modelAndView.addObject(ARTICLE_LIST,articleService.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/ventes", method = RequestMethod.GET)
    public ModelAndView getVentes() {
        ModelAndView modelAndView = new ModelAndView("menu-vente");
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        modelAndView.addObject(ARTICLE_LIST,articleService.findAll());
        modelAndView.addObject(CLIENT_FOURNISSEUR_LIST,clientFournisseurRepository.getAllExternalEntities(CLIENT));
        return modelAndView;
    }



    @RequestMapping(value = "/detail-ventes", method = RequestMethod.GET)
    public ModelAndView getDetailVentes() {
        ModelAndView modelAndView = new ModelAndView("menu-detail-vente");
        modelAndView.addObject(SALES_LIST, venteRepository.findAll());
        return modelAndView;
    }

    @RequestMapping(value = "/magasin", method = RequestMethod.GET)
    public ModelAndView getMenuMagasin() {
        List<Magasin> magasins = magasinRepository.findAll();
        ModelAndView modelAndView = new ModelAndView("menu-magasin");
        modelAndView.addObject(MAGASIN_LIST, magasins);
        return modelAndView;
    }

    @RequestMapping(value = "/stock",method = RequestMethod.GET)
    public ModelAndView getMenuStock(){
        ModelAndView modelAndView = new ModelAndView("menu-stock");
        modelAndView.addObject(MAGASIN_LIST,magasinRepository.findAll());
        modelAndView.addObject(STOCKS,articleService.getAllInventories());
        return modelAndView;
    }

    @Autowired private InfoArticleMagasinRepository infoArticleMagasinRepository;
    @Autowired private CategorieRepository categorieRepository;
    @Autowired private MagasinRepository magasinRepository;
    @Autowired private FonctionRepository fonctionRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ClientFournisseurRepository clientFournisseurRepository;
    @Autowired private ArticleService articleService;
    @Autowired private MaterielTransportRepository materielTransportRepository;
    @Autowired private SubsidiaryRepository subsidiaryRepository;
    @Autowired private VenteRepository venteRepository;
    @Autowired private TransfertRepository transfertRepository;
}

