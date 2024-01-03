package com.bucketlist.destinations.model;

import lombok.NonNull;

import java.io.Serializable;

public class UserVotesId implements Serializable {
    private Long userId;
    private Long voteId;

    public UserVotesId(@NonNull Long userId, @NonNull Long voteId) {
        this.userId = userId;
        this.voteId = voteId;
    }

    public UserVotesId() {
    }
}
