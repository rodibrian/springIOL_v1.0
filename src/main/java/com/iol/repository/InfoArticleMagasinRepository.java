package com.iol.repository;
import com.iol.model.tenantEntityBeans.InfoArticleMagasin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
public interface InfoArticleMagasinRepository extends JpaRepository<InfoArticleMagasin,Long>{
    @Query(value = "from InfoArticleMagasin iam  where iam.date=:dateStock ")
    List<InfoArticleMagasin> findAllByDate(@Param("dateStock")LocalDate localDate);

    @Query(value = "from InfoArticleMagasin iam  where iam.date between :beginDate and :endDate")
    List<InfoArticleMagasin> findAllBetweenData(@Param("beginDate")LocalDate beginDate,@Param("endDate")LocalDate endDate);
}
