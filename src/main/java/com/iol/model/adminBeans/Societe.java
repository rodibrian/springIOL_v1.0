package com.iol.model.adminBeans;
import com.iol.model.entityBeans.ClientFournisseur;
import com.iol.model.entityEnum.SocieteStatus;
import lombok.Data;
import javax.persistence.Entity;

@Data
@Entity
public class Societe extends ClientFournisseur{
    private String verset;
    private String slogan;
    private SocieteStatus societeStatus;
    private String schemaName;
}
