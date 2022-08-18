package com.iol.model.adminBeans;

        import com.iol.model.tenantEntityBeans.PersonnePhysique;
        import lombok.Data;

        import javax.persistence.Entity;

@Entity
@Data
public class AdminUser extends PersonnePhysique{
}
