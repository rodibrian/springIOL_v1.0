package com.iol.event;

import com.iol.repository.InfoArticleMagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler(InfoArticleMagasin.class)
public class InfoArticleMagasinEventHandler {

    @Autowired
    private InfoArticleMagasinRepository infoArticleMagasinRepository;

    @HandleBeforeCreate
    public void handleInfoBeforeCreate(InfoArticleMagasin infoArticleMagasin){

    }
}
