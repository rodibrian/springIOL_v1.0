package com.iol.controller.restController;
import com.iol.repository.MagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class MagasinRessource {

    private MagasinRepository magasinRepository;

    @Autowired
    public void setMagasinRepository(MagasinRepository magasinRepository) {
        this.magasinRepository = magasinRepository;
    }

}
