import React, { useState, useEffect } from 'react';
import TipsAndTricksList from './TipsAndTricks';
import './DestinationDetail.css';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import VoteChart from "./VoteChart";

interface Destination {
    destinationId: number;
    destinationCountry: string;
    destinationCity: string;
    destinationName: string;
    description: string;
}

const DestinationDetail: React.FC = () => {
    const { destinationId } = useParams<{ destinationId: string }>();
    const [destination, setDestination] = useState<Destination | null>(null);

    useEffect(() => {
        const fetchDestinationDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/destination/${destinationId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data: Destination = await response.json();
                    setDestination(data);
                } else {
                    console.error('Error fetching destination details:', response.statusText);
                    // Handle the error as needed, e.g., redirect to a not-found page
                }
            } catch (error) {
                console.error('Error fetching destination details:', error);
            }
        };

        fetchDestinationDetails();
    }, [destinationId]);

    if (!destination) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-page">
            <Navbar title="TravelTracker" />
            <div className="app-container">
                <div className="left-panel">
                    <div className="left-panel-content">
                        <h2>{destination.destinationName}</h2>
                        <p>{`City: ${destination.destinationCity}, Country: ${destination.destinationCountry}`}</p>
                        <p>Description: {destination.description}</p>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="right-panel-content">
                        <div className="tips-header">
                            <img src="/img/2779262.png" alt="Tips and Tricks" className="tips-image" />
                            <h2>Tips and Tricks</h2>
                        </div>
                        <TipsAndTricksList destinationId={destination.destinationId} />
                    </div>
                </div>
            </div>
            <div className="most-visited-section">
                <h2>View when this place is most visited</h2>
                <VoteChart destinationId={destination.destinationId} />
                {/* Add your content for the "View when this place is most visited" section */}
            </div>

        </div>
    );
};

export default DestinationDetail;
