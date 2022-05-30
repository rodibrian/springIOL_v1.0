package com.iol.model.entityBeans;

import com.iol.model.entityEnum.TypeOperationCaisse;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "operation_caisse")
public class OperationCaisse implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private TypeOperationCaisse operationCaisse;
    private Double montant;
    private Date date;
}
