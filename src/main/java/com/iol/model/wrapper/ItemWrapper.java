package com.iol.model.wrapper;

import lombok.Data;

@Data
public class ItemWrapper {
    private String itemId;
    private String uniteId;
    private String itemName;
    private String uniteName;
    private String stock;
    private String price;
}
