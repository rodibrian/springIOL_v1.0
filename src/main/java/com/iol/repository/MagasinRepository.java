package com.iol.repository;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.model.tenantEntityBeans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Transactional
@Controller
public interface MagasinRepository extends JpaRepository<Magasin,Long> {

}
