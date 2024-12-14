import React from 'react';
import Masonry from 'react-masonry-css';

const ImageWithTitle = ({ data, breakpointCols, openModal }) => {
  return (
    <div>
   
      <Masonry
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px' }} onClick={() => openModal(item)}>
            <img
              src={item.photoUrl}
              alt={item.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                height: 'auto',
              }}
            />
            <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{item.title}</h3>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageWithTitle;
