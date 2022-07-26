package com.iol.model.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InventoryWrapper{
    private Long articleId;
    private Long uniteId;
    private Long magasinId;
    private Double quantite;
}
