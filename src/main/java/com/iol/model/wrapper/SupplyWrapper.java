package com.iol.model.wrapper;

import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import com.iol.model.tenantEntityBeans.Supply;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SupplyWrapper {
   private List<Supply> supplies;
   private List<PrixArticleFiliale> prixArticleFiliales;
}
