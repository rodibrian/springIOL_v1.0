package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class VoyageId implements Serializable {
    private Long materielTransportId;
    private Long articleId;
    private Long fournisseurId;
}
