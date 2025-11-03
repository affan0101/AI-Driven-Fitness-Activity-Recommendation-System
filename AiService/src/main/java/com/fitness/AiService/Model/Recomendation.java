package com.fitness.AiService.Model;


import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "recomendations")
@Data
@Builder
public class Recomendation {
    @Id
    private String id;
    private String activityId;
    private String type;
    private String userId;
    private String recomendation;
    private List<String> improvements;
    private List<String> suggestion;
    private List<String> safety;

    @CreatedDate
    private LocalDateTime createdAt;
}
