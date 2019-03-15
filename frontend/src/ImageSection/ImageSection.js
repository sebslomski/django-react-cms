import React from 'react';

import './ImageSection.css';

const ImageSection = ({
  src,
}) => {
  return (
    <div className="ImageSection">
      <img src={src} alt="" />
    </div>
  );
};

export default ImageSection;
