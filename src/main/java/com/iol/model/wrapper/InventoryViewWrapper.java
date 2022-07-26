package com.iol.model.wrapper;

import lombok.Data;

import java.time.LocalDate;

@Data
public class InventoryViewWrapper extends InventoryWrapper {
    private LocalDate datePeremption;
    private String prixAchat;
    private String article;
    private String categorie;
    private String unite;
}
