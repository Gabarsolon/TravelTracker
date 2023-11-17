
// import React, { useState, useEffect } from 'react';

// interface Destination {
//   destinationCountry: string;
//   destinationCity: string;
//   public: boolean;
// }

// const BucketList: React.FC = () => {
//   const [bucketList, setBucketList] = useState<Destination[]>([]);
//   const [showAddModal, setShowAddModal] = useState<boolean>(false);
//   const [newDestination, setNewDestination] = useState<Destination>({
//     destinationCountry: '',
//     destinationCity: '',
//     public: false,
//   });

//   // Hardcoded destinations for demonstration
//   const hardcodedDestinations: Destination[] = [
//     { destinationCountry: 'Italy', destinationCity: 'Rome', public: false },
//     { destinationCountry: 'Australia', destinationCity: 'Sydney', public: false },
//     { destinationCountry: 'Canada', destinationCity: 'Vancouver', public: false },
//   ];

//   useEffect(() => {
//     // Use the hardcoded destinations initially
//     setBucketList(hardcodedDestinations);
//   }, []);
// //   useEffect(() => {
// //        fetch('http://localhost:8080/api/v1/destination/destinationsInBucketList/1', {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         })
// //           .then(response => response.json())
// //           .then((data: Destination[]) => setBucketList(data))
// //           .catch(error => console.error('Error fetching bucket list:', error));
// //       }, []);

//   const handleAddDestination = () => {
//     setBucketList(prevList => [...prevList, newDestination]);
//     setShowAddModal(false);
//     // Clear the form after adding a destination
//     setNewDestination({
//       destinationCountry: '',
//       destinationCity: '',
//       public: false,
//     });
//   };

//   return (
//     <div>
//       <h2 className='titleOfList'>Bucket List</h2>
//       <div className="list-container">
//         {bucketList.length === 0 ? (
//           <p>Empty Bucket List</p>
//         ) : (
//           <ul>
//             {bucketList.map((destination, index) => (
//               <li key={index}>
//                 {destination.destinationCountry}, {destination.destinationCity}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <button className="addButton" onClick={() => setShowAddModal(true)}>
//         +
//       </button>
      

//       {/* Add destination modal */}
//       {showAddModal && <div className="overlay" />}
//       {showAddModal && (
//         <div className="modal">
//           <label>
//             Country:
//             <input
//               type="text"
//               value={newDestination.destinationCountry}
//               onChange={e => setNewDestination({ ...newDestination, destinationCountry: e.target.value })}
//             />
//           </label>
//           <label>
//             City:
//             <input
//               type="text"
//               value={newDestination.destinationCity}
//               onChange={e => setNewDestination({ ...newDestination, destinationCity: e.target.value })}
//             />
//           </label>
//           <button onClick={handleAddDestination}>Add Destination</button>
//           <button onClick={() => setShowAddModal(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BucketList;
import React, { useState, useEffect } from 'react';

interface Destination {
    destinationName: string;
    destinationCountry: string;
    destinationCity: string;
    public: boolean;
    description: string;
}

const BucketList: React.FC = () => {
  const [bucketList, setBucketList] = useState<Destination[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newDestination, setNewDestination] = useState<Destination>({
    destinationName: '',
    destinationCountry: '',
    destinationCity: '',
    public: false,
    description: '',
  });

  // Hardcoded destinations for demonstration
  const hardcodedDestinations: Destination[] = [
    { destinationName: 'LALA', destinationCountry: 'Italy', destinationCity: 'Rome', public: false, description: 'LALA' },
    { destinationName: 'LALA', destinationCountry: 'Italy', destinationCity: 'Rome', public: false, description: 'LALA'},
   // { destinationCountry: 'Canada', destinationCity: 'Vancouver', public: false },
  ];

  useEffect(() => {
    // Use the hardcoded destinations initially
    setBucketList(hardcodedDestinations);
  }, []);

  const handleAddDestination = () => {
    setBucketList(prevList => [...prevList, newDestination]);
    setShowAddModal(false);
    // Clear the form after adding a destination
    setNewDestination({
        destinationName: '',
      destinationCountry: '',
      destinationCity: '',
      public: false,
        description: '',
    });
  };

  return (
    <div>
      <h2 className='titleOfList'>Bucket List</h2>
      <div className="list-container">
        {bucketList.length === 0 ? (
          <p>Empty Bucket List</p>
        ) : (
          <ul>
            {bucketList.map((destination, index) => (
              <li key={index}>
                {destination.destinationCountry}, {destination.destinationCity}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="addButton" onClick={() => setShowAddModal(true)}>
        +
      </button>

      {/* Add destination modal */}
    
      {showAddModal && (
        <div className="modal">
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
          <button onClick={handleAddDestination}>Add Destination</button>
          <button onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BucketList;

