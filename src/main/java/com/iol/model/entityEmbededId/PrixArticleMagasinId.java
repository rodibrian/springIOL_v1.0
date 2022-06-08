package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class PrixArticleMagasinId implements Serializable {
    private Long magasinId;
    private Long articleId;
}
