package com.iol.controller.restController;


import com.iol.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1")
public class ActivityRessource {

    @Autowired private ActivityRepository activityRepository;

//    @GetMapping(value = "/activities/{date}")
//    public ResponseEntity<Object> getAllActivities(@PathVariable("date")LocalDate date){
//        return  new ResponseEntity<>(activityRepository.findAllByDate(date),HttpStatus.OK);
//    }

}
