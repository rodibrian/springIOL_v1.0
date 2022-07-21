package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class InfoVenteId implements Serializable {
    private Long venteId;
    private Long articleId;
}
