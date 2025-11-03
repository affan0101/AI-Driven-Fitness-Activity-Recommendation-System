package com.example.activityService.Controller;

import com.example.activityService.Service.ActivityService;
import com.example.activityService.dto.ActivityRequest;
import com.example.activityService.dto.ActivityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing fitness activities.
 */
@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor // Generates constructor for all final fields
public class ActivityController {
    @Autowired
    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request, @RequestHeader("X-User-ID") String userId){
        request.setUserId(userId);
        return ResponseEntity.ok(activityService.trackActivity(request));
    }
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getUserActivities(@RequestHeader("X-User-ID") String userId){

        return ResponseEntity.ok(activityService.getUserActivities(userId));
    }
}