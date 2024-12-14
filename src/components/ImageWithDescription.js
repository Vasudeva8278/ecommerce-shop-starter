import React from 'react';
import Masonry from 'react-masonry-css';

const ImageWithDescription = ({ data, breakpointCols }) => {
  return (
    <div>

      <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
        {data.map((item, index) => (
          <div key={index} className="image-container">
            <img src={item.photoUrl} alt={item.title} className="image" />
            <div className="image-title">{item.title}</div>
            <div className="image-description">{item.description}</div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageWithDescription;
