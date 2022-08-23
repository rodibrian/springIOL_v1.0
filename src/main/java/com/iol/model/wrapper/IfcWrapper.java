package com.iol.model.wrapper;

import com.iol.model.entityEnum.ModePayement;
import lombok.Data;

@Data
public class IfcWrapper {
    private String modePayement;
    private String description;
}
