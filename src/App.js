import React, { useEffect, useState } from 'react';

const App = () => {
  const [masonryData, setMasonryData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/masonry/'); // Replace with your API endpoint
        const data = await response.json();
        setMasonryData(data.masonries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {masonryData.map((item) => (
          <div key={item._id} style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>{item.title}</h3>
            <img
              src={item.photoUrl}
              alt={item.title}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
