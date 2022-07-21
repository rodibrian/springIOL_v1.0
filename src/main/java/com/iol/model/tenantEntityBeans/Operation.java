package com.iol.model.tenantEntityBeans;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "operation")
@Data
public class Operation{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_operation",columnDefinition = "TEXT")
    private String typeOperation;

    @OneToOne
    @JoinTable(name = "operation_caisse",joinColumns = {@JoinColumn(name = "operation_id",foreignKey = @ForeignKey(name = "op_caisse_operation_key_constraint"))},
            inverseJoinColumns = {@JoinColumn(name = "opp_caisse_id",foreignKey = @ForeignKey(name = "op_caisse_oppc_key_constraint"))})
    private OperationCaisse operationCaisse;

    @OneToOne
    @JoinTable(name = "operation_vente",joinColumns = {@JoinColumn(name = "operation_id",foreignKey = @ForeignKey(name = "op_vente_operation_key_constraint"))},
            inverseJoinColumns = {@JoinColumn(name = "vente_id",foreignKey = @ForeignKey(name = "op_vente_vente_key_constraint"))})
    private Vente vente;

    @OneToOne
    @JoinTable(name = "operation_approv",joinColumns = {@JoinColumn(name = "operation_id",foreignKey = @ForeignKey(name = "op_app_operation_key_constraint"))},
    inverseJoinColumns = {@JoinColumn(name = "approv_id",foreignKey = @ForeignKey(name = "op_app_approv_key_constraint"))})
    private Supply supply;
}
