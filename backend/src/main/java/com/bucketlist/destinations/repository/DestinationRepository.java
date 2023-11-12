package com.bucketlist.destinations.repository;

import com.bucketlist.destinations.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}
