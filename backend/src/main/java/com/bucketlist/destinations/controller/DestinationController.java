package com.bucketlist.destinations.controller;

import com.bucketlist.destinations.model.Destination;
import com.bucketlist.destinations.service.BucketListService;
import com.bucketlist.destinations.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/destination")
public class DestinationController {
    private final DestinationService destinationService;
    private final BucketListService bucketListService;

    @Autowired
    public DestinationController(DestinationService destinationService, BucketListService bucketListService) {
        this.destinationService = destinationService;
        this.bucketListService = bucketListService;
    }
    @PostMapping("/{userId}")
    public ResponseEntity<Object> addDestination(@RequestBody Destination destination, @PathVariable Long userId){
        Destination savedDestination =  destinationService.addDestination(destination, userId);
        bucketListService.linkDestinationToUser(userId, savedDestination.getDestination_id());

        return new ResponseEntity<>("Destination added successfully to bucket list", HttpStatus.CREATED);
    }
}
