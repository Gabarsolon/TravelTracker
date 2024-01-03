package com.bucketlist.destinations.service;

import com.bucketlist.destinations.model.UserVotes;
import com.bucketlist.destinations.repository.UserVotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserVotesService {
    protected UserVotesRepository userVotesRepository;

    @Autowired
    public UserVotesService(UserVotesRepository userVotesRepository) {
        this.userVotesRepository = userVotesRepository;
    }

    public void addUserVotes(UserVotes userVotes) {
        this.userVotesRepository.save(userVotes);
    }

    /**
     * Checks whether the user already voted. If so, an exception is thrown.
     * @param userId user that tries to vote
     * @param voteId id that identifies the destination and the month that is voted
     */
    public void existsUserVotes(Long userId, Long voteId) {
        UserVotes userVotes = this.userVotesRepository.findUserVotesByUserIdAndVoteId(userId, voteId);
        if (userVotes != null) {
            throw new UnsupportedOperationException("You have already voted this destination for this month.");
        }
    }
}
