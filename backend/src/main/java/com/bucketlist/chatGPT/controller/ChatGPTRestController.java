package com.bucketlist.chatGPT.controller;

import com.bucketlist.chatGPT.model.DestinationRequest;
import com.bucketlist.chatGPT.model.SearchRequest;
import com.bucketlist.chatGPT.service.ChatGPTService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
   public String getRecommendedDestination(@RequestBody DestinationRequest destinationRequest) {
       String continent = destinationRequest.getContinent();
       String country = destinationRequest.getCountry();
       String regionType = destinationRequest.getRegionType();
       String month = destinationRequest.getMonth();
       String season = destinationRequest.getSeason();
       String activities = destinationRequest.getActivities();

        log.info("\nsearchDestination - continent: " + continent +
                "\ncountry: " + country +
                "\nmonth: " + month +
                "\nseason: " + season +
                "\nregion type: " + regionType +
                "\nadditionalInfo: " + activities);

        SearchRequest recommendedDestination = chatGPTService.createSearchDestinationPrompt(
                continent, country, month, regionType, season, activities);

        return this.searchChatGPT(recommendedDestination);
   }

}
