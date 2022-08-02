package com.iol;
import com.iol.model.tenantEntityBeans.*;
import com.iol.repository.FonctionRepository;
import com.iol.repository.MagasinRepository;
import com.iol.repository.SubsidiaryRepository;
import com.iol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import pl.allegro.finance.tradukisto.MoneyConverters;
import pl.allegro.finance.tradukisto.ValueConverters;
import pl.allegro.finance.tradukisto.internal.IntegerToStringConverter;
import pl.allegro.finance.tradukisto.internal.NumberProcessor;
import pl.allegro.finance.tradukisto.internal.ToStringConverter;
import pl.allegro.finance.tradukisto.internal.converters.BigDecimalToBankingMoneyConverter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@SpringBootApplication
@ServletComponentScan
public class Iol {
    public static void main(String[] args) {
        SpringApplication.run(Iol.class,args);
    }
}

