package com.bucketlist.destinations.repository;

import java.util.List;
import com.bucketlist.destinations.model.BucketList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketListRepository extends JpaRepository<BucketList, Long> {

     List<BucketList> findBucketListByBucketListPK_UserId(Long userId);
}
