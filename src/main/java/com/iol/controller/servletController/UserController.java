package com.iol.controller.servletController;

import com.iol.model.tenantEntityBeans.User;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping("/allUser")
    @GetMapping
    private ModelAndView getAllUser(){
        ModelAndView modelAndView = new ModelAndView("/WEB-INF/views/index.jsp");
        List<User> all = userRepository.findAll();
        modelAndView.addObject("users",all);
        return modelAndView;
    }
}
