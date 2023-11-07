package com.bucketlist.chatGPT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ChatGPTService {
    //private static final String MAIN_PAGE = "index";
    @Autowired
    private ObjectMapper jsonMapper;
    @Autowired
    private OpenAiApiClient client;

//    private String chatWithGPT3(String message) throws Exception {
//        var completion = CompletionRequest.defaultWith(message);
//        var postByJson = jsonMapper.writeValueAsString(completion);
//        var responseBody = client.postToOpenAiApi(postByJson, OpenAiApiClient.OpenAiService.GPT_3);
//        var completionResponse = jsonMapper.readValue(responseBody, CompletionResponse.class);
//        return completionResponse.firstAnswer().orElseThrow();
//    }
//
//    @GetMapping(path = "/")
//    public String index() {
//        return MAIN_PAGE;
//    }
//
//    @GetMapping(path = "/")
//    public String chat(Model model, @ModelAttribute FormInputDTO dto) {
//        try{
//            model.addAttribute("request", dto.prompt());
//            model.addAttribute("response", chatWithGPT3(dto.prompt()));
//        } catch (Exception e) {
//            model.addAttribute("response", "Error in communication with ChatGPT API");
//        }
//        return MAIN_PAGE;
//    }

    public static void main(String[] args) {
        ObjectMapper jsonMapper = new ObjectMapper();
        OpenAiApiClient client = new OpenAiApiClient();

        try {
            String message = "say just hi"; // Replace with your desired prompt
            String response = chatWithGPT3(message, jsonMapper, client);
            System.out.println("Response from GPT-3: " + response);
        } catch (Exception e) {
            System.err.println("Error in communication with ChatGPT API: " + e.getMessage());
        }
    }

    private static String chatWithGPT3(String message, ObjectMapper jsonMapper, OpenAiApiClient client) throws Exception {
        var completion = CompletionRequest.defaultWith(message);
        var postByJson = jsonMapper.writeValueAsString(completion);
        var responseBody = client.postToOpenAiApi(postByJson, OpenAiApiClient.OpenAiService.GPT_3);
        var completionResponse = jsonMapper.readValue(responseBody, CompletionResponse.class);
        return completionResponse.firstAnswer().orElseThrow();
    }
}
