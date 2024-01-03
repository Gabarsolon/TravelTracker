package com.bucketlist.destinations.service;

import com.bucketlist.destinations.exception.ResourceNotFoundException;
import com.bucketlist.destinations.model.Destination;
import com.bucketlist.destinations.model.Vote;
import com.bucketlist.destinations.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {
    protected VoteRepository voteRepository;

    @Autowired
    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Vote addVote(Vote vote) {
        return this.voteRepository.save(vote);
    }

    public void addDefaultDestinationVotes(Long destinationId) {
        Integer defaultVotes = 0;
        for (int month = 1; month <= 12; month++) {
            this.addVote(new Vote(destinationId, month, defaultVotes));
        }
    }

    public List<Vote> getAllDestinationVotes(Long destinationId) {
        return voteRepository.findDestinationByDestinationId(destinationId);
    }

    public Vote getVoteByDestinationIdAndMonth(Long destinationId, Long month) {
        Vote vote = voteRepository.findVoteByDestinationIdAndMonth(destinationId, month);
        if (vote != null) {
            return vote;
        } else {
            throw new UnsupportedOperationException("Vote number cannot be increased. No such vote with the given destinationId and month.");
        }
    }

    public Vote updateVoteNumber(Long voteId) {
        Optional<Vote> existingVote = voteRepository.findById(voteId);
        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            int currentNumberOfVotes = vote.getNumber();
            vote.setNumber(currentNumberOfVotes + 1);
            return this.voteRepository.save(vote);
        } else {
            throw new UnsupportedOperationException("Vote number cannot be increased. Vote not found.");
        }
    }
}
