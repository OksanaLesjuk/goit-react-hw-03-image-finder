import React from 'react';

const ImageGalleryItem = ({ hit: { webformatURL, largeImageURL, id } }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
