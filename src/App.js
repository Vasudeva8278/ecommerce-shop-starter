import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { FaSearch } from 'react-icons/fa';
import './App.css'; // Custom styles
import ImageWithDescription from './components/ImageWithDescription';
import NoGapImage from './components/NoGapImage';
import ImageWithTitle from './components/ImageWithTitle';
import Modal from './Modal';
const App = () => {
  const [masonryData, setMasonryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for modal image

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/masonry/');
      const data = await response.json();
      setMasonryData((prevData) => [...prevData, ...data.masonries]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Infinite scroll logic
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
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData]);

  // Filter data by search term
  const filteredData = masonryData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define breakpoints for masonry layout
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const openModal = (image) => {
    setSelectedImage(image); // Set the clicked image to the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/image-with-title">Image with Title</Link></li>
            <li><Link to="/no-gap-image">No Gap Image</Link></li>
            <li><Link to="/image-with-description">Image with Description</Link></li>
          </ul>
          <div className="search-box">
            <FaSearch size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </nav>

        {/* Routes for each component */}
        <Routes>
          <Route path="/image-with-title" element={<ImageWithTitle data={filteredData} breakpointCols={breakpointColumnsObj} openModal={openModal} />} />
          <Route path="/no-gap-image" element={<NoGapImage data={filteredData} breakpointCols={breakpointColumnsObj} openModal={openModal} />} />
          <Route path="/image-with-description" element={<ImageWithDescription data={filteredData} breakpointCols={breakpointColumnsObj} openModal={openModal} />} />
          <Route path="/" element={<div>Welcome to the gallery!</div>} />
        </Routes>

        {/* Loading Indicator */}
        {loading && <div style={{ textAlign: 'center', margin: '20px' }}>Loading...</div>}

        {/* Modal to display clicked image */}
        {selectedImage && <Modal image={selectedImage} closeModal={closeModal} />}
      </div>
    </Router>
  );
};

export default App;
