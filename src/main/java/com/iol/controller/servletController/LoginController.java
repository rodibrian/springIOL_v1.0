package com.iol.controller.servletController;
import com.iol.model.tenantEntityBeans.User;
import com.iol.repository.CategorieRepository;
import com.iol.repository.ClientFournisseurRepository;
import com.iol.repository.UserRepository;
import com.iol.service.CashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;

@Controller
@SessionAttributes(names = "connectedUser")
public class LoginController {

    private UserRepository userRepository;

    private CategorieRepository categorieRepository;

    private final String CONNECTED_USER = "connectedUser";
    private final String DASHBOARD_VIEW = "dashboard";
    private final String LOGIN_VIEW = "login";
    private final String CATEGORIES = "categories";

    @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
    public String index(Model model) {
        return LOGIN_VIEW;
    }

    @RequestMapping(value = "/signup",method = RequestMethod.GET)
    private String getLogin(){
        return LOGIN_VIEW;
    }

    @Autowired
    private CashService cashService;
    @Autowired private ClientFournisseurRepository clientFournisseurRepository;

    @RequestMapping(value = "/signup",method = RequestMethod.POST)
    private ModelAndView signUp(HttpServletRequest request,HttpServletResponse response){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Optional<User> optionalUser = userRepository.checkUser(username,password);
        ModelAndView modelAndView = new ModelAndView();
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            modelAndView.addObject(CONNECTED_USER,user);
            Long filialeId = user.getFiliale().getId();
            modelAndView.addObject(CATEGORIES,categorieRepository.findAll());
            Map<String, Double> cashInfo = cashService.getCashInfo(filialeId);
            modelAndView.addObject("espece",cashInfo.get(CashService.getSommeEspece()));
            modelAndView.addObject("credit",cashInfo.get(CashService.getSommeCredit()));
            modelAndView.addObject("depense",cashInfo.get(CashService.getSommeDepense()));
            modelAndView.addObject("encaissement",cashInfo.get(CashService.getSommeEncaissement()));
            modelAndView.addObject("client_list", clientFournisseurRepository.getAllExternalEntities(0,filialeId));
            modelAndView.addObject("fournisseur_list", clientFournisseurRepository.getAllExternalEntities(1,filialeId));
            modelAndView.setViewName(DASHBOARD_VIEW);
        }else {
            modelAndView.addObject(CONNECTED_USER,null);
            modelAndView.setViewName(LOGIN_VIEW);
        }
        return modelAndView;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }
}
