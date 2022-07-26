package com.iol.model.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StockWrapper {
    private Long articleId;
    private Long uniteId;
    private Long magasinId;
    private LocalDate datePeremption;
    private String prixAchat;
    private String article;
    private String categorie;
    private String unite;
    private String stock;
}
