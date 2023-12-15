import React, { useEffect, useState } from 'react';

interface Destination {
  destinationId: number;
  destinationCountry: string;
  destinationCity: string;
  destinationName: string;
  description: string;
  public: boolean;
}

const PublicList: React.FC = () => {
  const [publicList, setPublicList] = useState<Destination[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterAttribute, setFilterAttribute] = useState<string>('DestinationName');

  useEffect(() => {
    const fetchFilteredDestinations = async () => {
      try {
        const params = new URLSearchParams();
        params.append('filteringAttribute', filterAttribute);
        params.append('filterInputData', searchTerm || '');
        params.append('pageNumber', '0');  // Set your desired page number
        params.append('pageSize', '100');    // Set your desired page size

        const filterUrl = `http://localhost:8080/api/v1/destination/filterPublicDestinations?${params.toString()}`;

        const response = await fetch(filterUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: Destination[] = await response.json();
          setPublicList(data);
        } else {
          console.error('Error fetching public list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching public list:', error);
      }
    };

    fetchFilteredDestinations();
  }, [searchTerm, filterAttribute]);

  const displayedDestinations = publicList;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterAttribute(event.target.value);
  };

  return (
    <div>
      
      <h2 className='titleOfList'>Public List</h2>
      
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
        {displayedDestinations.length === 0 ? (
          <p>Empty Public List</p>
        ) : (
          <ul>
            {displayedDestinations.map((destination) => (
              <li key={destination.destinationId}>
                <strong style={{ fontSize: '1.2em', fontStyle: 'oblique' }}>
                  {destination.destinationName}
                </strong><br />
                {destination.destinationCity}, {destination.destinationCountry}<br />
                <i style={{ fontSize: '0.8em' }}>
                  {destination.description.length > 50
                    ? `${destination.description.slice(0, 50)}...`
                    : destination.description}
                </i>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PublicList;
