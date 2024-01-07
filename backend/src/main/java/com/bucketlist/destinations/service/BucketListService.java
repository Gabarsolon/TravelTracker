package com.bucketlist.destinations.service;

import com.bucketlist.destinations.model.BucketList;
import com.bucketlist.destinations.repository.BucketListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BucketListService {
    protected BucketListRepository bucketListRepository;
    @Autowired
    public BucketListService(BucketListRepository bucketListRepository) {
        this.bucketListRepository = bucketListRepository;
    }

    public void linkDestinationToUser(Long userId, Long destinationId, String description){
        if (isDestinationInUserBucketList(userId, destinationId)) {
            // If the entry exists, you can handle it according to your requirements
            // For now, let's print a message
            throw new RuntimeException("Destination already exists in your bucket list!");
        } else {
            // If the entry doesn't exist, create a new one
            bucketListRepository.save(new BucketList(new BucketList.BucketListPK(userId, destinationId), description));
        }
    }

    public boolean isDestinationInUserBucketList(Long userId, Long destinationId) {
        //BucketList.BucketListPK bucketListPK = new BucketList.BucketListPK(userId, destinationId);
        return bucketListRepository.existsByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, destinationId);
    }
}
