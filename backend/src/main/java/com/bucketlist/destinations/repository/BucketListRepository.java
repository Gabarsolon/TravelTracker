package com.bucketlist.destinations.repository;

import com.bucketlist.destinations.model.BucketList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketListRepository extends JpaRepository<BucketList, Long> {
}
