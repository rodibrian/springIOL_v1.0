package com.iol.controller.restController;


import com.iol.model.tenantEntityBeans.User;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserRessource {
    
   private UserRepository userRepository;

   @Autowired
   public UserRessource(UserRepository userRepository) {
        this.userRepository = userRepository;
   }

   @GetMapping(value = "/users")
   public ResponseEntity<List<User>> getUsers(){
       List<User> all = userRepository.findAll();
       return ResponseEntity.of(Optional.of(all));
   }

   @PostMapping(value = "/users")
   public ResponseEntity<Object> create(@RequestBody User user){
       User save = userRepository.save(user);
       return ResponseEntity.status(HttpStatus.CREATED).body(save);
   }

   @GetMapping(value = "/users/{username}/{password}")
   public ResponseEntity<Object> checkUser(@PathVariable(name = "username") String username , @PathVariable(name = "password") String password){
       Optional<User> optionalUser = userRepository.checkUser(username, password);
       if (optionalUser.isPresent())return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
       return new ResponseEntity<>(" Unable to find user with username = "+username+" and password ="+password,HttpStatus.INTERNAL_SERVER_ERROR);
   }

   @DeleteMapping("/users/{id}")
   public ResponseEntity<Object> delete(@PathVariable("id") Long id){
       try{
           userRepository.deleteById(id);
           return new ResponseEntity<>(" The feature with the id ="+id+" is deleted",HttpStatus.OK);
       }catch (Exception e){
           return new ResponseEntity<>(e.getMessage(),HttpStatus.valueOf(500));
       }
   }
}
