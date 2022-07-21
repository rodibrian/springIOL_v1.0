package com.iol.model;

import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.PrixVenteUniteArticleFiliale;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SupplyWrapper {
   private List<InfoArticleMagasin> infoArticleMagasins;
   private List<PrixVenteUniteArticleFiliale> prixVenteUniteArticleFiliales;
}
