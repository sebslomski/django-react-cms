import React from 'react';

import Article from '../Article';

import './App.css';

const App = () => {
  const article = {
    id: 'article-1',
    sections: [
      {
        id: 'section-1',
        type: 'text',
        text: 'This is some text coming from the backend.',
      },
      {
        id: 'section-2',
        type: 'image',
        src: 'http://placekitten.com/g/600/600',
      }
    ],
  };
  return (
    <div className="App">
      <header className="App-header">
        React-CMS
      </header>
      <Article {...article} />
    </div>
  );
}

export default App;
