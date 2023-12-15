import React, { useState, useEffect } from 'react';

interface Destination {
  destinationCountry: string;
  destinationCity: string;
  public: boolean;
  description: string;
  destinationName: string;
}

const BucketList: React.FC = () => {
  const [bucketList, setBucketList] = useState<Destination[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newDestination, setNewDestination] = useState<Destination>({
    destinationCountry: '',
    destinationCity: '',
    public: false,
    description: '',
    destinationName: '',
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterAttribute, setFilterAttribute] = useState<string>('DestinationName');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 1; // Replace with the appropriate user ID

        const response = await fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/${userId}?pageNumber=0&pageSize=100&filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBucketList(data);
        } else {
          console.error('Error fetching bucket list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bucket list:', error);
      }
    };

    fetchData();
  }, [searchTerm, filterAttribute]);

  const handleAddDestination = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/destination/add/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      });

      if (response.ok) {
        // Add the new destination to the bucket list
        setBucketList(prevList => [...prevList, newDestination]);
        setShowAddModal(false);
        // Clear the form after adding a destination
        setNewDestination({
          destinationCountry: '',
          destinationCity: '',
          public: false,
          description: '',
          destinationName: '',
        });
      } else {
        console.error('Error adding destination:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterAttribute(event.target.value);
  };

  return (
    <div>
      <h2 className='titleOfList'>Bucket List</h2>
      <div className="list-container">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={filterAttribute} onChange={handleFilterChange}>
            <option value="DestinationName">Name</option>
            <option value="DestinationCity">City</option>
            <option value="DestinationCountry">Country</option>
          </select>
        </div>
        {bucketList.length === 0 ? (
          <p>Empty Bucket List</p>
        ) : (
          <ul>
            {bucketList.map((destination, index) => (
              <li key={index}>
                <strong style={{ fontSize: '1.2em', fontStyle: 'oblique' }}>{destination.destinationName}</strong><br />
                {destination.destinationCity}, {destination.destinationCountry}<br />
                <i style={{ fontSize: '0.8em' }}>
                  {destination.description.length > 50 ? `${destination.description.slice(0, 50)}...` : destination.description}
                </i>
                <li></li>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="addButton" onClick={() => setShowAddModal(true)}>
        +
      </button>

      {showAddModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <h4 className='Addtitle'>Add destination</h4>
            <label>
              Name:
              <input
                type="text"
                value={newDestination.destinationName}
                onChange={e => setNewDestination({ ...newDestination, destinationName: e.target.value })}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={newDestination.destinationCountry}
                onChange={e => setNewDestination({ ...newDestination, destinationCountry: e.target.value })}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={newDestination.destinationCity}
                onChange={e => setNewDestination({ ...newDestination, destinationCity: e.target.value })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newDestination.description}
                onChange={e => setNewDestination({ ...newDestination, description: e.target.value })}
              />
            </label>
            <button onClick={handleAddDestination}>Add Destination</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BucketList;
