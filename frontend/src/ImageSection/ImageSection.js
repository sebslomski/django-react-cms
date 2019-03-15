import React from 'react';

import './ImageSection.css';

const ImageSection = ({
  src,
}) => {
  return <div>
    <img src={src} alt="" />
  </div>;
};

export default ImageSection;
