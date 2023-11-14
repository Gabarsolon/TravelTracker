package com.bucketlist.chatGPT.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class DestinationRequest {
    @NotNull(message = "The CONTINENT field cannot be null.")
    @NotEmpty(message = "The CONTINENT field cannot be empty.")
    @Pattern(regexp="^[A-Za-z]*$", message = "The CONTINENT field must contain only letters.")
    private String continent;

    @NotNull(message = "The COUNTRY field cannot be null.")
    @NotEmpty(message = "The COUNTRY field cannot be empty.")
    @Pattern(regexp="^[A-Za-z]*$", message = "The COUNTRY field must contain only letters.")
    private String country;

    @NotNull(message = "The REGION TYPE field cannot be null.")
    @NotEmpty(message = "The REGION TYPE field cannot be empty.")
    @Pattern(regexp="^[A-Za-z]*$", message = "The REGION TYPE field must contain only letters.")
    private String regionType;

    @NotNull(message = "The MONTH field cannot be null.")
    @NotEmpty(message = "The MONTH field cannot be empty.")
    @Pattern(regexp="^[A-Za-z]*$", message = "The MONTH field must contain only letters.")
    private String month;

    @NotNull(message = "The SEASON field cannot be null.")
    @NotEmpty(message = "The SEASON field cannot be empty.")
    @Pattern(regexp="^((in|off)-season)|anytime", message = "regex")
    //@Pattern(regexp="^[A-Za-z]*$", message = "The SEASON field must contain only letters.")
    private String season;

    @NotNull(message = "The ACTIVITIES field cannot be null.")
    @NotEmpty(message = "The ACTIVITIES field cannot be empty.")
    @Pattern(regexp = "^[A-Za-z]*(, *[A-Za-z]+)*", message = "Invalid activities. Please enumerate the activities with commas in between them.")
    private String activities;
}
