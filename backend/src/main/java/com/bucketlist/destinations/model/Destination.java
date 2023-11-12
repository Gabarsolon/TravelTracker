package com.bucketlist.destinations.model;

import jakarta.persistence.*;
import lombok.NonNull;

@Entity
@Table(name = "\"Destination\"")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "destination_id", nullable = false)
    private Long destination_id;
    @NonNull
    private String destination_country;
    @NonNull
    private String destination_city;
    @NonNull
    private boolean is_public;

    public Destination(Long destination_id, @NonNull String destination_country, @NonNull String destination_city, @NonNull boolean is_public) {
        this.destination_id = destination_id;
        this.destination_country = destination_country;
        this.destination_city = destination_city;
        this.is_public = is_public;
    }

    public Destination() {

    }

    public Long getDestination_id() {
        return destination_id;
    }

    public void setDestination_id(Long destination_id) {
        this.destination_id = destination_id;
    }

    public String getDestination_country() {
        return destination_country;
    }

    public void setDestination_country(String destination_country) {
        this.destination_country = destination_country;
    }

    public String getDestination_city() {
        return destination_city;
    }

    public void setDestination_city(String destination_city) {
        this.destination_city = destination_city;
    }

    public boolean isIs_public() {
        return is_public;
    }

    public void setIs_public(boolean is_public) {
        this.is_public = is_public;
    }
}
