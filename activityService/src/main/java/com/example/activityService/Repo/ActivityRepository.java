package com.example.activityService.Repo;

import com.example.activityService.Modal.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity,String> {


    List<Activity> findByUserId(String userId);
}
