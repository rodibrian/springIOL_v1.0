package com.iol.service;

import com.iol.model.entityEnum.ModePayement;
import com.iol.model.entityEnum.TypeOperationCaisse;
import com.iol.model.tenantEntityBeans.InfoFilialeCaisse;
import com.iol.repository.CashRepository;
import com.iol.repository.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Clock;
import java.time.LocalDate;
import java.util.*;

@Service
public class CashService {
    private final  static String SOMME_VENTE = "VENTE";
    private final  static String SOMME_ESPECE = "ESPECE";
    private final  static String SOMME_VIREMENT = "VIREMENT";
    private final  static String SOMME_CHEQUE = "CHEQUE";
    private final  static String SOMME_CREDIT = "CREDIT";
    private final  static String RECETTE = "RECETTE";
    private final  static String SOMME_AVOIR = "AVOIR";
    private final  static String SOMME_MOBILE_MONEY = "MOBILE_MONEY";
    private final  static String SOMME_DEPENSE = "DEPENSE";
    private final static  String SOMME_ENCAISSEMENT = "ENCAISSEMENT";

    public Map<String,Double > getCashInfo(Long filialeId){
         Map<String,Double > info = new HashMap<>();
         LocalDate now = LocalDate.now(Clock.systemDefaultZone());
         Double sumVente = venteRepository.getSum(LocalDate.now()).orElse(0.0);
         Double sumEspece = cashRepository.findByTypePayement(ModePayement.ESPECE, now).orElse(0.0);
         Double sumVirement = cashRepository.findByTypePayement(ModePayement.VIREMENT,now).orElse(0.0);
         Double sumCheque = cashRepository.findByTypePayement(ModePayement.CHEQUE,now).orElse(0.0);
         Double sumCredit = cashRepository.findByTypePayement(ModePayement.CREDIT,now).orElse(0.0);
         Double recette = sumVente - sumCredit;
         Double sumMobileMoney = cashRepository.findByTypePayement(ModePayement.MOBILE_MONEY,now).orElse(0.0);
         Double avoir = cashRepository.findByOperationType(TypeOperationCaisse.AVOIR,now).orElse(0.0);
         Double sommeDepense = cashRepository.findByOperationType(TypeOperationCaisse.DECAISSEMENT,now).orElse(0.0);
         Double sommeEncaissement = cashRepository.findByOperationType(TypeOperationCaisse.ENCAISSEMENT, now).orElse(0.0);
         info.put(SOMME_VENTE,sumVente);
         info.put(SOMME_ESPECE,sumEspece);
         info.put(SOMME_VIREMENT,sumVirement);
         info.put(SOMME_CHEQUE,sumCheque);
         info.put(SOMME_CREDIT,sumCredit);
         info.put(RECETTE,recette);
         info.put(SOMME_MOBILE_MONEY,sumMobileMoney);
         info.put(SOMME_AVOIR,avoir);
         info.put(SOMME_DEPENSE,sommeDepense);
         info.put(SOMME_ENCAISSEMENT,sommeEncaissement);
      return info;
  }
    public static String getSommeVente() {
        return SOMME_VENTE;
    }
    public static String getSommeEspece() {
        return SOMME_ESPECE;
    }
    public static String getSommeVirement() {
        return SOMME_VIREMENT;
    }
    public static String getSommeCheque() {
        return SOMME_CHEQUE;
    }
    public static String getSommeCredit() {
        return SOMME_CREDIT;
    }
    public static String getRecette() {
        return RECETTE;
    }
    public static String getSommeAvoir() {
        return SOMME_AVOIR;
    }
    public static String getSommeMobileMoney() {
        return SOMME_MOBILE_MONEY;
    }
    public static String getSommeDepense() {
        return SOMME_DEPENSE;
    }
    public static String getSommeEncaissement() {
        return SOMME_ENCAISSEMENT;
    }
    @Autowired private CashRepository cashRepository;
    @Autowired private VenteRepository venteRepository;
}
