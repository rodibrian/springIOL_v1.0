package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ArticleUniteId implements Serializable {
    private Long articleId;
    private Long uniteId;
}
