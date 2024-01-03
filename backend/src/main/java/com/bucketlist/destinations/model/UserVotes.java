package com.bucketlist.destinations.model;

import jakarta.persistence.*;
import lombok.NonNull;

import java.io.Serializable;


@Entity
@IdClass(UserVotesId.class)
@Table(name = "\"User_Votes\"")
public class UserVotes {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Id
    @Column(name = "vote_id", nullable = false)
    private Long voteId;

    public UserVotes(@NonNull Long userId, @NonNull Long voteId) {
        this.userId = userId;
        this.voteId = voteId;
    }

    public UserVotes() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVoteId() {
        return voteId;
    }

    public void setVoteId(Long voteId) {
        this.voteId = voteId;
    }

    @Override
    public String toString() {
        return "UserVotes with userId: " + userId + " , voteId: " + voteId + "\n";
    }
}
