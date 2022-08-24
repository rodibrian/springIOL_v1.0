package com.iol.model.entityEnum;

import org.springframework.boot.Banner;

public enum ModePayement {
    MOBILE_MONEY,CHEQUE,VIREMENT,ESPECE,AUTRE,CREDIT;
    public static String typePayement2String(ModePayement modePayement){
        switch (modePayement){
            case AUTRE: return "AUTRE";
            case CHEQUE: return "CHEQUE";
            case CREDIT: return "CREDIT";
            case ESPECE: return "ESPECE";
            case VIREMENT: return "VIREMENT";
            case MOBILE_MONEY:return "MOBILE_MONEY";
            default: return "";
        }
    }
    public static ModePayement string2TypePayement(String value){
        switch (value){
            case "AUTRE": return AUTRE;
            case "CHEQUE" : return CHEQUE ;
            case "CREDIT" : return CREDIT ;
            case "ESPECE" : return ESPECE ;
            case "VIREMENT" : return VIREMENT ;
            case "MOBILE_MONEY":return MOBILE_MONEY;
            default: return AUTRE;
        }
    }
}
