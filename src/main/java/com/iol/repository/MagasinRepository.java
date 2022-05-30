package com.iol.repository;
import com.iol.model.entityBeans.Magasin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Controller
public interface MagasinRepository extends JpaRepository<Magasin,Long> {
}
