package com.iol;

import com.iol.model.entityBeans.Categorie;
import com.iol.model.entityBeans.Fonction;
import com.iol.model.entityBeans.Fonctionnalite;
import com.iol.model.entityBeans.User;
import com.iol.model.entityEnum.Sexe;
import com.iol.model.entityEnum.SituationMatrimoniale;
import com.iol.repository.CategorieRepository;
import com.iol.repository.UserRepository;
import org.apache.tomcat.util.descriptor.web.JspPropertyGroup;
import org.apache.tomcat.util.descriptor.web.JspPropertyGroupDescriptorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.descriptor.JspConfigDescriptor;
import javax.servlet.descriptor.JspPropertyGroupDescriptor;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Set;

@SpringBootApplication(scanBasePackages = {
        "com.iol.config",
        "com.iol.controller",
        "com.iol.model.adminBeans",
        "com.iol.model.entityEnum",
        "com.iol.repository"
})
public class Iol{
    public static void main(String[] args) {
        SpringApplication.run(Iol.class,args);
    }
}

