package com.campus.resource.sharing.system.repository;

import com.campus.resource.sharing.system.entity.Resource;
import com.campus.resource.sharing.system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByOwner(User owner);
    List<Resource> findByCategory(Resource.Category category);
    List<Resource> findByStatus(Resource.Status status);
}
