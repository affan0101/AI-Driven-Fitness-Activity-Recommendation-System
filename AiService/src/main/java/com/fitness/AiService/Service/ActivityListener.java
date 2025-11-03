package com.fitness.AiService.Service;

import com.fitness.AiService.Model.Activity;
import com.fitness.AiService.Model.Recomendation;
import com.fitness.AiService.Repo.RecomendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityListener {

    private final ActivityAiService activityAiService;
    private final RecomendationRepository recomendationRepository;

    @KafkaListener(topics = "${spring.kafka.topic.name}",groupId = "activity-processor-group")
    public void processActivity(Activity activity){
         log.info("Recieve Activity for processing : {}",activity.getUserId());
        Recomendation recomendation=activityAiService.generateRecommendation(activity);
        recomendationRepository.save(recomendation);

    }
}
