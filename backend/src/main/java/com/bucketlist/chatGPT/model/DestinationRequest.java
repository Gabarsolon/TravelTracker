package com.bucketlist.chatGPT.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class DestinationRequest {
    @NonNull
    private String continent;
    @NonNull
    private String country;
    @NonNull
    private String regionType;
    @NonNull
    private String month;
    @NonNull
    private String season;
    @NonNull
    private String activities;
}
