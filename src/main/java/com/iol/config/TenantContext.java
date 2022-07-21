//package com.iol.config;
//public class TenantContext {
//    private static final String DEFAULT = "iolDb";
//    private static ThreadLocal<String> currentTenant = new InheritableThreadLocal<>();
//    public static String getCurrentTenant() {
//        return currentTenant.get();
//    }
//    public static void setCurrentTenant(String tenant) {
//        currentTenant.set(tenant);
//    }
//    public static void clear() {
//        currentTenant.set(null);
//    }
//}