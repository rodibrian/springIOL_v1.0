package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import java.io.Serializable;

@Data
@Embeddable
public class PrixUniteArticleFilialeId implements Serializable {
    private Long filialeId;
    private Long articleId;
    private Long uniteId;
}
