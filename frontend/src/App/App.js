import React from 'react';

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost';


import ArticleDetailView from '../Article/ArticleDetailView';

import './App.css';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:7100/gql',
})

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <header className="App-header">
          React-CMS
        </header>
        <div className="App-wrapper">
          <ArticleDetailView />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
