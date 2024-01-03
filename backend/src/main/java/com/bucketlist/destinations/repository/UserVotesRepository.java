package com.bucketlist.destinations.repository;

import com.bucketlist.destinations.model.UserVotes;
import com.bucketlist.destinations.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVotesRepository extends JpaRepository<UserVotes, Long> {
    UserVotes findUserVotesByUserIdAndVoteId(Long userId, Long voteId);
}
