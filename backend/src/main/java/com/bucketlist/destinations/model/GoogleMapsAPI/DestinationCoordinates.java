package com.bucketlist.destinations.model.GoogleMapsAPI;

public class DestinationCoordinates {
    private double latitude;
    private double longitude;

    public DestinationCoordinates(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public DestinationCoordinates() {}

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
