package com.iol.model.wrapper;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.PrixArticleFiliale;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SupplyWrapper {
   private List<InfoArticleMagasin> infoArticleMagasins;
   private List<PrixArticleFiliale> prixArticleFiliales;
}
