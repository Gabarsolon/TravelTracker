package com.bucketlist.destinations.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bucketlist.destinations.exception.NotFoundException;
import com.bucketlist.destinations.exception.ResourceNotFoundException;
import com.bucketlist.destinations.model.BucketList;
import java.util.Objects;

import com.bucketlist.destinations.model.Destination;
import com.bucketlist.destinations.repository.BucketListRepository;
import com.bucketlist.destinations.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DestinationService {
    protected DestinationRepository destinationRepository;
    protected BucketListRepository bucketListRepository;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository, BucketListRepository bucketListRepository) {
        this.destinationRepository = destinationRepository;
        this.bucketListRepository = bucketListRepository;
    }

    public Destination addDestination(Destination destination) {
        return this.destinationRepository.save(destination);
    }

    public List<Destination> getAllDestinations(Integer pageNumber, Integer pageSize) {
        return destinationRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
    }

    public List<Destination> getPublicDestinations(Integer pageNumber, Integer pageSize) {
        return destinationRepository.findDestinationsByIsPublic(true, PageRequest.of(pageNumber, pageSize));
    }

    public Long getNumberOfDestinations() {
        return destinationRepository.count();
    }

    public List<Destination> getDestinationsInUserBucketList(Long userId, String filteringAttribute, String filterInputData, Pageable pageable) {
        if (Objects.equals(filteringAttribute, "DestinationName"))
            return destinationRepository.findDestinationsForGivenUserId(userId, "", "", filterInputData, pageable);
        else if (Objects.equals(filteringAttribute, "DestinationCity"))
            return destinationRepository.findDestinationsForGivenUserId(userId, "", filterInputData, "", pageable);
        // DestinationCountry
        return destinationRepository.findDestinationsForGivenUserId(userId, filterInputData, "", "", pageable);
    }

    public Integer getNumberOfDestinationsInUserBucketList(Long userId, String filteringAttribute, String filteringData) {
        return getDestinationsInUserBucketList(userId, filteringAttribute, filteringData, Pageable.unpaged()).size();
    }


    public List<Destination> getPublicDestinationsFiltered(String filteringAttribute, String filterInputData, Pageable pageable) {
        if (filteringAttribute.equals("DestinationName"))
            return destinationRepository.findDestinationByIsPublicAndDestinationNameContainingIgnoreCase(true, filterInputData, pageable);
        else if (filteringAttribute.equals("DestinationCity"))
            return destinationRepository.findDestinationByIsPublicAndDestinationCityContainingIgnoreCase(true, filterInputData, pageable);
        // DestinationCountry
        return destinationRepository.findDestinationByIsPublicAndDestinationCountryContainingIgnoreCase(true, filterInputData, pageable);
    }

    public Integer getNumberOfFilteredPublicDestinations(String filteringAttribute, String filterInputData) {
        return getPublicDestinationsFiltered(filteringAttribute, filterInputData, Pageable.unpaged()).size();
    }

    public Destination getDestinationDetails(Long destinationId, Long userId) {
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + destinationId));
        if (destination.isPublic())
            return destination;
        BucketList.BucketListPK bucketListPK = new BucketList.BucketListPK(destinationId, userId);
        destination.setDescription(bucketListRepository.findBucketListByBucketListPK(bucketListPK).getDescription());
        return destination;
    }

    public Destination getDestinationById(Long destinationId) {
        return destinationRepository.findById(destinationId).orElse(null);
    }

    public Destination updateDestination(Long destinationId, Destination newDestination, Long userId) {
        System.out.println("Received newDestination: " + newDestination.toString());
        Destination selectedDestination = destinationRepository.findById(destinationId).orElseThrow(() -> new ResourceNotFoundException("Destination with id: " + destinationId + " not found"));
        Destination existingDestination = findDestinationByNameAndCityAndCountry(newDestination.getDestinationName(), newDestination.getDestinationCity(), newDestination.getDestinationCountry());

        // Selected destination is public
        if(selectedDestination.isPublic()) {
            System.out.println("Case0");
            throw new UnsupportedOperationException("Public destinations cannot be edited!");
        }

        // New destination exists and is public
        if (existingDestination != null && existingDestination.isPublic()){
            System.out.println("Case1");
            throw new UnsupportedOperationException("Destination already exists as a public destination!");
        }

        // New destination is private, but exists in the bucket list
        if (existingDestination != null &&
                bucketListRepository.existsByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, existingDestination.getDestinationId())){
            System.out.println("Case2");
            throw new UnsupportedOperationException("Destination already exists in your bucket list!");
        }

        // New destination exists or does not exist at all, so we add it in the BucketList
        var bucketListPK = new BucketList.BucketListPK(userId, destinationId);
        // We delete the existing bucket list entry
        bucketListRepository.delete(new BucketList(bucketListPK, bucketListRepository.findBucketListByBucketListPK(bucketListPK).getDescription()));

        if (existingDestination != null &&
                !bucketListRepository.existsByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, existingDestination.getDestinationId())) {
            // If it exists already, we do not add it again in the destination table
            System.out.println("Case3");
            bucketListRepository.save(new BucketList(new BucketList.BucketListPK(userId, existingDestination.getDestinationId()), newDestination.getDescription()));
            return newDestination;
        }

        // New destination did not exist
        System.out.println("Case4");
        Destination confirmedNewDestination =  destinationRepository.save(newDestination);
        bucketListRepository.save(new BucketList(new BucketList.BucketListPK(userId, confirmedNewDestination.getDestinationId()), newDestination.getDescription()));
        return confirmedNewDestination;
    }

    public void deleteDestination(Long destinationId, Long userId) {
        Optional<Destination> destinationOptional = destinationRepository.findById(destinationId);

        if(destinationOptional.isPresent()) {
            Destination destination = destinationOptional.get();
            System.out.println("Is public");
            System.out.println(destinationId);
            System.out.println(userId);
            bucketListRepository.deleteByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, destinationId);
            System.out.println("Deleted from BL");

            if(!destination.isPublic() && bucketListRepository.countBucketListByBucketListPK_DestinationId(destinationId) == 0) {
                System.out.println("Is not public");
                destinationRepository.deleteById(destinationId);
                System.out.println("Deleted from destination table");
            }

//            if(destination.isPublic()) {
//                System.out.println("is public");
//                bucketListRepository.deleteByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, destinationId);
//                System.out.println("deleted from BL");
//            }
//            else{
//                System.out.println("is not public");
//                bucketListRepository.deleteByBucketListPK_UserIdAndBucketListPK_DestinationId(userId, destinationId);
//                destinationRepository.deleteById(destinationId);
//            }
        }
        else{
            throw new NotFoundException("Destination with ID: " + destinationId + " not found.");
        }
    }

    public Destination findDestinationByNameAndCityAndCountry(String destinationName, String destinationCity, String destinationCountry){
        return destinationRepository.findDestinationByDestinationNameAndDestinationCityAndDestinationCountry(destinationName, destinationCity, destinationCountry);
    }
}