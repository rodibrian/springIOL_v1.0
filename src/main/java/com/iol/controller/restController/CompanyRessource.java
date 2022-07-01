package com.iol.controller.restController;

import com.google.common.io.Resources;
import com.iol.model.adminBeans.Societe;
import com.iol.model.entityBeans.Categorie;
import com.iol.repository.CompanyRepository;
import com.iol.repository.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1")
public class CompanyRessource {

    private CompanyRepository companyRepository;

    @Autowired
    private Connection connection;

    @PostMapping("/companies")
    public ResponseEntity<Object> create(@RequestBody Societe societe ){
        Societe societe1 = companyRepository.save(societe);
        String query = " CREATE DATABASE "+societe.getSchemaName();
        try(Statement statement = connection.createStatement();) {
            statement.execute(query);
            Connection factoryConnection = ConnectionFactory.getConnection(societe.getSchemaName());
            String databaseSchema = readFile("schema.sql");
            boolean execute = factoryConnection.createStatement().execute(databaseSchema);
            factoryConnection.close();
        } catch (SQLException | IOException throwables) {
            throwables.printStackTrace();
        }
        return new ResponseEntity<>(societe1, HttpStatus.CREATED);
    }

    private String readFile(final String relFilePath) throws IOException {
        final URL url = Resources.getResource(relFilePath);
        return Resources.toString(url, StandardCharsets.UTF_8);
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
            Optional<Societe> optionalSociete = companyRepository.findById(id);
            if (!optionalSociete.isPresent()) return ResponseEntity.notFound().build();
            Societe societe = optionalSociete.get();
            companyRepository.delete(societe);
            try {
                String query = " DROP DATABASE "+societe.getSchemaName()+";";
                this.connection.createStatement().execute(query);
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        return new ResponseEntity<>(" The item with the id ="+id+" is deleted",HttpStatus.OK);
    }

    @GetMapping("/companies")
    public ResponseEntity<Object> getAllCompanies(){
        List<Societe> all = companyRepository.findAll();
        return new ResponseEntity<>(all,HttpStatus.CREATED);
    }

    @PutMapping("/companies/{id}")
    public ResponseEntity<Object> update(@RequestBody Societe societe, @PathVariable(value = "id") Long id){
        Optional<Societe> societeOptional = companyRepository.findById(id);
        if (!societeOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        societe.setId(id);
        companyRepository.save(societe);
        return new ResponseEntity<>(societe, HttpStatus.OK);
    }

    @Autowired
    public void setCompanyRepository(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
}
