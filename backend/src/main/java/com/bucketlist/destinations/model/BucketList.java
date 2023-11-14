package com.bucketlist.destinations.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "\"BucketList\"")
public class BucketList {

    public static class BucketListPK implements Serializable {
        @Column(name = "user_id")
//        @OneToMany
        private Long userId;
        @Column(name = "destination_id")
//        @OneToMany
        private Long destinationId;

        public BucketListPK(Long userId, Long destinationId) {
            this.userId = userId;
            this.destinationId = destinationId;
        }
        public BucketListPK(){

        }


        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public void setDestinationId(Long destinationId) {
            this.destinationId = destinationId;
        }

        public Long getDestinationId() {
            return destinationId;
        }

    }
    @EmbeddedId
    private BucketListPK bucketListPK;

    public BucketList(BucketListPK bucketListPK) {
        this.bucketListPK = bucketListPK;
    }

    public BucketList() {

    }
    public BucketListPK getBucketListPK() {
        return bucketListPK;
    }

    public void setBucketListPK(BucketListPK bucketListPK) {
        this.bucketListPK = bucketListPK;
    }
}
