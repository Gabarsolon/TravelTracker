import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
    const pageSize = 4;
    const [totalPages, setTotalPages] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [countDestinations, setCountDestinations] = useState<number>(0);
   // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // the count of destinations
                const countResponse = await fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/1/count?filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`);
                const countData = await countResponse.json();
                const countDestinations = countData;
                setCountDestinations(countDestinations);
                const totalPages = Math.ceil(countDestinations / pageSize);
                setTotalPages(totalPages);

                // get destinations for the first page
                const dataResponse = await fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/1?pageNumber=${currentPage - 1}&pageSize=${pageSize}&filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`);
                const data = await dataResponse.json();
                setBucketList(data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
              //  setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, filterAttribute, searchTerm]);

    // const fetchData = (page: number, filter: string = '') => {
    //     fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/1?pageNumber=${page - 1}&pageSize=${pageSize}&filteringAttribute=${filterAttribute}&filterInputData=${filter}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then((data: Destination[]) => setBucketList(data))
    //         .catch(error => console.error('Error fetching bucket list:', error));
    // };

    // const fetchDataCount = () => {
    //     fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/1/count?filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setCountDestinations(data);
    //             const updatedTotalPages = Math.ceil(data / pageSize);
    //             setTotalPages(updatedTotalPages);
    //         })
    //         .catch(error => console.error('Error fetching bucket list count:', error));
    // };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const userId = 1;
    //
    //             const response = await fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/${userId}?pageNumber=${currentPage - 1}&pageSize=${pageSize}&filteringAttribute=${filterAttribute}&filterInputData=${searchTerm}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setBucketList(data);
    //             } else {
    //                 console.error('Error fetching bucket list:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching bucket list:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [searchTerm, filterAttribute]);

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
               // const updatedCount = countDestinations + 1;
                setCountDestinations(prevCount => prevCount + 1);
                const updatedTotalPages = Math.ceil((countDestinations + 1) / pageSize);
               // const updatedTotalPages = Math.ceil(updatedCount / pageSize);
                setTotalPages(updatedTotalPages);

                // Set the current page to the newly calculated total pages
                setCurrentPage(updatedTotalPages);


            } else {
                console.error('Error adding destinationnn:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding destination:', error);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {

        setCurrentPage(value);
       // fetchData(value);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const userId = 1;

        const notifyBackend = async () => {
            const draggedItem = JSON.parse(e.dataTransfer.getData('text/plain'));

            const isItemAlreadyInBucket = bucketList.some(
                (item) =>
                    item.destinationName === draggedItem.destinationName &&
                    item.destinationCountry === draggedItem.destinationCountry &&
                    item.destinationCity === draggedItem.destinationCity
            );

            if (!isItemAlreadyInBucket) {
                try {
                    const response = await fetch(`http://localhost:8080/api/v1/destination/dragDrop/${userId}/${draggedItem.destinationId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        if (response.status === 400) {
                            alert('This item is already in your Bucket List!');
                        } else {
                            console.error('Error notifying backend:', response.statusText);
                        }
                    } else {
                        const updatedData = await fetch(`http://localhost:8080/api/v1/destination/destinationsInBucketList/1?pageNumber=${currentPage - 1}&pageSize=${pageSize}&filteringAttribute=${filterAttribute}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then(response => response.json());

                        setBucketList(updatedData);

                        setCountDestinations(prevCount => prevCount + 1);
                        const updatedTotalPages = Math.ceil((countDestinations + 1) / pageSize);
                        // const updatedTotalPages = Math.ceil(updatedCount / pageSize);
                        setTotalPages(updatedTotalPages);

                        // Set the current page to the newly calculated total pages
                        setCurrentPage(updatedTotalPages);


                        console.log("adxsfdcasc: "+ currentPage);

                    }
                } catch (error) {
                    console.error('Error notifying backend:', error);
                }
            } else {
                alert('This item is already in your Bucket List!');
            }
        };

        notifyBackend();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        //fetchDataCount();
        setCurrentPage(1);
        console.log("handleSearchChange: " + "currentPage" + currentPage + " totalPages: " + totalPages, + " count: " + countDestinations)

    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("handleFilterChange: " + "currentPage" + currentPage + " totalPages: " + totalPages, + " count: " + countDestinations)

        setFilterAttribute(event.target.value);
    };

    return (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <div className='button-and-title'>
                <div className='button-div'>
                <Tooltip title="Add a destination" arrow>
                    <button className="addButton" onClick={() => setShowAddModal(true)}>
                         +
                    </button>
                </Tooltip>
                </div>
                <h2 className='titleOfList' style={{margin: '0 auto'}}>Bucket List</h2>


            </div>

            <div className="list-container" style={{ height: '450px', backgroundColor: '#f7f4ed', flex: 1}}>
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
                                <strong style={{
                                    fontSize: '1.2em',
                                    fontStyle: 'oblique'
                                }}>{destination.destinationName}</strong><br/>
                                {destination.destinationCity}, {destination.destinationCountry}<br/>
                                <i style={{fontSize: '0.8em'}}>
                                    {destination.description.length > 50 ? `${destination.description.slice(0, 50)}...` : destination.description}
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
                    siblingCount={0}
                />
            </div>


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
                                onChange={e => setNewDestination({
                                    ...newDestination,
                                    destinationCountry: e.target.value
                                })}
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
