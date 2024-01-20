import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios'; // Import axios if not already done
import './Map.css';

const containerStyle = {
    width: '1000px',
    height: '600px'
};

const center = {
    lat: 46.770439,
    lng: 23.591423
};

// Functional Component
const Map: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "" // ADD MAPS KEY HERE WHEN RUNNING
        // DELETE KEY WHEN PUSHING TO GIT
    });
    const userId = localStorage.getItem('userId');
    const [map, setMap] = useState(null);
    const [destinations, setDestinations] = useState<Array<{ latitude: number; longitude: number}>>([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            console.log(userId)
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/destination/getCoordinatesForDestinationsInBucketList/${userId}`
                );

                // Assuming the response data is an array of destinations with 'latitude' and 'longitude'
                setDestinations(response.data);
            } catch (error) {
                console.error('Error fetching destination coordinates:', error);
            }
        };
        fetchDestinations();
    }, [userId]);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {destinations.map((destination, index) => (
                    <Marker
                        key={index}
                        position={{ lat: destination.latitude, lng: destination.longitude }}
                        // title={destination.name}
                        // You can customize the marker icon, animation, etc. here
                    />
                ))}
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
};


// Main App Component
const App: React.FC = () => {
    return (
        <div className="map-container">
            <h3>My Google Map</h3>
            <Map />
        </div>
    );
};


export default App;
// npm install @googlemaps/js-api-loader @react-google-maps/api