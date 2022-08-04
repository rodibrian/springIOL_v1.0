package com.iol.repository;
import com.iol.model.tenantEntityBeans.Magasin;
import com.iol.model.tenantEntityBeans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Transactional
@Controller
public interface MagasinRepository extends CrudRepository<Magasin,Long> {
    @Query(value = "from magasin m join m.filiale f where f.id=:filialeId")
    List<Magasin> findAllByFiliale(@Param("filialeId")Long filialeId);
}
