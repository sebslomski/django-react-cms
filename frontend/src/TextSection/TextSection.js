import React from 'react';

import './TextSection.css';

const TextSection = ({
  text,
}) => {
  return (
    <div className="TextSection">
      {text}
    </div>
  );
};

export default TextSection;
