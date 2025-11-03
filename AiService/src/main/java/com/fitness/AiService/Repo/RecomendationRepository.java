package com.fitness.AiService.Repo;

import com.fitness.AiService.Model.Recomendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecomendationRepository extends MongoRepository<Recomendation,String> {


    List<Recomendation> findByUserId(String userId);

    Optional<Recomendation> findByActivityId(String activityId);
}
