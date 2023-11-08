package com.bucketlist.chatGPT.model;

import lombok.Data;

import java.util.List;

@Data
public class ChatGPTResponse {
    private List<ChatGPTChoice> choices;
}
