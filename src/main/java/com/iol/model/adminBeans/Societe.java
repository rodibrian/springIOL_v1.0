package com.iol.model.adminBeans;
import com.iol.model.tenantEntityBeans.ClientFournisseur;
import com.iol.model.entityEnum.SocieteStatus;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
public class Societe extends ClientFournisseur{
    @Column(columnDefinition = "TEXT")
    private String verset;

    @Column(columnDefinition = "TEXT")
    private String slogan;

    private SocieteStatus societeStatus;

    @Column(columnDefinition = "TEXT")
    private String schemaName;
}
