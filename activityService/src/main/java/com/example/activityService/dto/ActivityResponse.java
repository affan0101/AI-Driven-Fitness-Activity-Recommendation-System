package com.example.activityService.dto;

import com.example.activityService.Modal.ActivityType;
import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Map;
@Data
public class ActivityResponse {
    private String id;
    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    private Map<String,Object> additionalMetrices;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
