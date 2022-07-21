package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class PrixArticleFilialeId implements Serializable {
    private Long filialeId;
    private Long articleId;
    private Long uniteId;
}
