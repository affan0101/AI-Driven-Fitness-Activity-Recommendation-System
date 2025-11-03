package com.fitness.AiService.Service;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@Data
public class GemeniService {

         public final WebClient webClient;
         private String geminiApiUrl="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
         private String geminiApiKey="xxxxxxxxxxxxxxxxxxxxxxxxxxCreate your own api key";

         public GemeniService (WebClient.Builder webClientBuilder){
             this.webClient= WebClient.builder().build();
         }

         public String getRecomendation(String details){
             Map<String,Object> requestBody=Map.of(
                     "contents",new Object[]{
                         Map.of("parts",new Object[]{
                                 Map.of("text",details)
                         })
                     }
             );
             String response=webClient.post()
                     .uri(geminiApiUrl)
                     .header("Content-Type","application/json")
                     .header("x-goog-api-key",geminiApiKey)
                     .bodyValue(requestBody)
                     .retrieve()
                     .bodyToMono(String.class)
                     .block();
             return response;
         }
}
