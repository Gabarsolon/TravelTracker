import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

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

  const pageSize = 4;
  const [totalPages, setTotalPages] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countDestinations, setCountDestinations] = useState<number>(0);

  const handleItemClick = (destinationId: number) => {
    // Redirect to the destination details page using the destination ID
    window.location.assign(`/detail/${destinationId}`);
  };


  useEffect(() => {
    const fetchFilteredDestinations = async () => {
      try {

        const countResponse = await fetch(`http://localhost:8080/api/v1/destination/filterPublicDestinations/count?filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`);
        const countData = await countResponse.json();
        const countDestinations = countData;
        setCountDestinations(countDestinations);
        const updatedTotalPages = Math.ceil(countDestinations / pageSize);
        setTotalPages(updatedTotalPages);
        console.log("totalP: " + totalPages + " current: " + currentPage + " countD: " + countDestinations);

        const params = new URLSearchParams();
        params.append('filteringAttribute', filterAttribute);
        params.append('filterInputData', searchTerm || '');
        params.append('pageNumber', (currentPage - 1).toString());  // Set your desired page number
        params.append('pageSize', pageSize.toString());    // Set your desired page size

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
  }, [searchTerm, filterAttribute, currentPage]);

  const displayedDestinations = publicList;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterAttribute(event.target.value);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, destination: Destination) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(destination));
  };


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {

    setCurrentPage(value);
    // fetchData(value);
   };

  return (
    <div>
      <h2 className='titleOfList' >Public List</h2>
      <div className="list-container" style={{ backgroundColor: '#f7f4ed'}}>
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
              <li
                key={destination.destinationId}
                onClick={() => handleItemClick(destination.destinationId)}
                draggable
                onDragStart={(e) => handleDragStart(e, destination)}
              >
                <strong style={{ fontSize: '1.2em', fontStyle: 'oblique' }}>
                  {destination.destinationName}
                </strong><br />
                {destination.destinationCity}, {destination.destinationCountry}<br />
                <i style={{ fontSize: '0.8em' }}>
                  {destination.description.length > 50
                    ? `${destination.description.slice(0, 50)}...`
                    : destination.description}
                </i>
                <li></li>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="pagination-container" align="center">
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            size="large"
        />
      </div>
    </div>
  );
};

export default PublicList;
