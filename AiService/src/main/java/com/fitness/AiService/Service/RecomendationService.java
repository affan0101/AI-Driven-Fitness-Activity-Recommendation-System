package com.fitness.AiService.Service;

import com.fitness.AiService.Model.Recomendation;
import com.fitness.AiService.Repo.RecomendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecomendationService {
    public final RecomendationRepository recomendationRepository;

    public List<Recomendation> getUserRecomendation(String userId) {
          return recomendationRepository.findByUserId(userId);
    }

    public  Recomendation getActivityRecomendation(String activityId) {
        return recomendationRepository.findByActivityId(activityId).orElseThrow(()->new RuntimeException("No recomendation found for this Activity : "+activityId));

    }
}
