package com.iol.model.entityEmbededId;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Id;
import java.io.Serializable;

@Embeddable
@Data
public class ApprovArticleId implements Serializable{
    private Long approvId;
    private Long articleId;
}
