package com.iol.controller.servletController;

import com.iol.model.tenantEntityBeans.User;
import com.iol.repository.CategorieRepository;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Controller
public class LoginController {

    private UserRepository userRepository;

    private CategorieRepository categorieRepository;

    private final String CONNECTED_USER = "connectedUser";
    private final String DASHBOARD_VIEW = "dashboard";
    private final String LOGIN_VIEW = "login";

    @RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
    public String index(Model model) {
        return LOGIN_VIEW;
    }

    @RequestMapping(value = "/signup",method = RequestMethod.GET)
    private String getLogin(){
        return LOGIN_VIEW;
    }

    @RequestMapping(value = "/signup",method = RequestMethod.POST)
    private ModelAndView signUp(HttpServletRequest request, HttpServletResponse response){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Optional<User> optionalUser = userRepository.checkUser(username,password);
        ModelAndView modelAndView = new ModelAndView();
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            modelAndView.addObject(CONNECTED_USER, user);
            modelAndView.addObject("categories",categorieRepository.findAll());
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
