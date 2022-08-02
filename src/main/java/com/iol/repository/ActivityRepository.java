package com.iol.repository;
import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import com.iol.model.tenantEntityBeans.Magasin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
public interface ActivityRepository extends JpaRepository<InfoArticleMagasin,Long>{

    @Query(value = "from InfoArticleMagasin iam join iam.magasin m where iam.date=:date and m.id =:magasinId")
    List<InfoArticleMagasin> findAllByDate(@Param("magasinId") Long id,@Param("date")LocalDate localDate);

    @Query(value = "from InfoArticleMagasin iam join iam.magasin m where m.id =:magasinId and iam.date between :beginDate and :endDate")
    List<InfoArticleMagasin> findAllBetweenDate(@Param("magasinId") Long magasinId,
                                                @Param("beginDate")LocalDate beginDate,
                                                @Param("endDate")LocalDate endDate);

    @Query(value = "from InfoArticleMagasin iam join iam.magasin m where m.id =:magasinId")
    List<InfoArticleMagasin> findAllByMagasin(@Param("magasinId")Long magasinId);

}
