package com.bucketlist.destinations.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "\"BucketList\"")
public class BucketList {

    public static class BucketListPK implements Serializable {
        @Column(name = "user_id")
//        @OneToMany
        private Long user_id;
        @Column(name = "destination_id")
//        @OneToMany
        private Long destination_id;

        public BucketListPK(Long user_id, Long destination_id) {
            this.user_id = user_id;
            this.destination_id = destination_id;
        }
        public BucketListPK(){

        }


        public Long getUser_id() {
            return user_id;
        }

        public void setUser_id(Long user_id) {
            this.user_id = user_id;
        }

        public void setDestination_id(Long destination_id) {
            this.destination_id = destination_id;
        }

        public Long getDestination_id() {
            return destination_id;
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
