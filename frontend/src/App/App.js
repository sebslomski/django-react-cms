import React from 'react';

import Article from '../Article';

import './App.css';

const App = () => {
  const article = {
    id: '1',
    title: 'Some article title',
    sections: [
      {
        id: '1',
        modelName: 'textsection',
        text: 'This is some text coming from the backend.',
      },
      {
        id: '2',
        modelName: 'imagesection',
        src: 'http://placekitten.com/g/600/600',
      }
    ],
  };
  return (
    <div className="App">
      <header className="App-header">
        React-CMS
      </header>
      <div className="App-wrapper">
        <Article {...article} />
      </div>
    </div>
  );
}

export default App;
