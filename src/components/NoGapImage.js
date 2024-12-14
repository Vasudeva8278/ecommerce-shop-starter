import React from 'react';
import Masonry from 'react-masonry-css';

const NoGapImage = ({ data, breakpointCols }) => {
  return (
    <div>
 
      <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-column">
        {data.map((item, index) => (
          <div key={index} className="no-gap-container">
            <img src={item.photoUrl} alt={item.title} className="no-gap-image" />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default NoGapImage;
