import React from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
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

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        //const bounds = new window.google.maps.LatLngBounds(center);
        //map.fitBounds(bounds);
        map.setZoom(5);
       // map.center(center);
        //map.setZoom(5);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </div>
    ) : <></>;
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
// npm install @googlemaps/js-api-loader @react-google-maps/api

// npm i -S @react-google-maps/api

//  npm install --save google-maps-react

export default App;
