package com.bucketlist.chatGPT.controller;

import com.bucketlist.chatGPT.model.DestinationRequest;
import com.bucketlist.chatGPT.model.SearchRequest;
import com.bucketlist.chatGPT.service.ChatGPTService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/api/v1")
public class ChatGPTRestController {
    private ChatGPTService chatGPTService;

    public ChatGPTRestController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping("/searchChatGPT")
    public String searchChatGPT(@RequestBody SearchRequest searchRequest) {
        log.info("searchChatGpt Started query: " + searchRequest.getQuery());

        return chatGPTService.processSearch(searchRequest.getQuery());
    }

   @GetMapping("/getRecommendedDestination")
   public ResponseEntity<String> getRecommendedDestination(
           @RequestParam("continent") String continent,
           @RequestParam("country") String country,
           @RequestParam("regionType") String regionType,
           @RequestParam("month") String month,
           @RequestParam("season") String season,
           @RequestParam("activities") String activities){

        log.info("\nsearchDestination - continent: " + continent +
                "\ncountry: " + country +
                "\nmonth: " + month +
                "\nseason: " + season +
                "\nregion type: " + regionType +
                "\nadditionalInfo: " + activities);

        SearchRequest recommendedDestination = chatGPTService.createSearchDestinationPrompt(
                continent, country, month, regionType, season, activities);
        String res = this.searchChatGPT(recommendedDestination);
        return ResponseEntity
                .accepted()
                .body(res);
   }

}
