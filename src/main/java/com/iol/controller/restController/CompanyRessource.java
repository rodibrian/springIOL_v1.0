package com.iol.controller.restController;

import com.google.common.io.Resources;
import com.iol.model.adminBeans.Societe;
import com.iol.repository.CompanyRepository;
import com.iol.repository.ConnectionFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.util.BeanDefinitionUtils;
import org.springframework.data.web.config.SpringDataWebConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class CompanyRessource {

    private CompanyRepository companyRepository;

//    @Autowired
//    private Connection connection;

    @PostMapping("/companies")
    public ResponseEntity<Object> create(@RequestBody final Societe societe ){
//        Societe societe1 = companyRepository.save(societe);
//        String query = " CREATE DATABASE "+societe.getSchemaName();
//        try(Statement statement = connection.createStatement()){
//            statement.execute(query);
//            Connection factoryConnection = ConnectionFactory.getConnection(societe.getSchemaName());
//            String databaseSchema = readFile("schema.sql");
//            boolean execute = factoryConnection.createStatement().execute(databaseSchema);
//            List<String> list = getAllCreatedDatabase(statement);
//            factoryConnection.close();
//            if (list.contains(societe1.getSchemaName())) return new ResponseEntity<>(societe1, HttpStatus.CREATED);
//            else return new ResponseEntity<>(" Error occured while creating the "+ societe1.getSchemaName() +" database ", HttpStatus.INTERNAL_SERVER_ERROR);
//        } catch (SQLException | IOException throwables) {
//            throwables.printStackTrace();
//        }
        return null;
    }

    private List<String> getAllCreatedDatabase(Statement statement) throws SQLException {
        ArrayList<String> list = new ArrayList<>();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM pg_database");
        while (resultSet.next()){
           list.add(resultSet.getString(2));
        }
        return list;
    }

    private String readFile(final String relFilePath) throws IOException{
        final URL url = Resources.getResource(relFilePath);
        return Resources.toString(url, StandardCharsets.UTF_8);
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
            Optional<Societe> optionalSociete = companyRepository.findById(id);
            if (!optionalSociete.isPresent()) return ResponseEntity.notFound().build();
            Societe societe = optionalSociete.get();
            companyRepository.delete(societe);
//            try {
//                String query = " DROP DATABASE "+societe.getSchemaName()+";";
////                this.connection.createStatement().execute(query);
//            } catch (SQLException throwables) {
//                throwables.printStackTrace();
//            }
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
