package com.iol.model.tenantEntityBeans;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "operation")
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Operation extends OperationData{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "magasin_id",foreignKey = @ForeignKey(name = "FK_MAGASIN_ID",foreignKeyDefinition = "FOREIGN KEY (magasin_id) REFERENCES magasin(id_magasin) ON DELETE CASCADE ON UPDATE NO ACTION"))
    private Magasin magasin;
}
