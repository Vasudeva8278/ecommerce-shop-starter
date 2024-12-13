import React, { useEffect, useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import './App.css'; // Optional: Add custom styles here

const App = () => {
  const [masonryData, setMasonryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/masonry/'); // Replace with your API endpoint
      const data = await response.json();
      setMasonryData((prevData) => [...prevData, ...data.masonries]); // Append data to create looping effect
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Infinite scrolling logic
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      setLoading(true);
      setTimeout(() => {
        fetchData();
        setLoading(false);
      }, 1000); // Simulate loading delay
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Breakpoints for masonry layout
  const breakpointColumnsObj = {
    default: 4, // Default column count
    1100: 3,    // 3 columns for screen widths <= 1100px
    700: 2,     // 2 columns for screen widths <= 700px
    500: 1      // 1 column for screen widths <= 500px
  };

  return (
    <div>
      <h1>Infinite Scrolling Photo Gallery</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {masonryData.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <img
              src={item.photoUrl}
              alt={item.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{item.title}</h3>
          </div>
        ))}
      </Masonry>
      {loading && <div style={{ textAlign: 'center', margin: '20px' }}>Loading...</div>}
    </div>
  );
};

export default App;
