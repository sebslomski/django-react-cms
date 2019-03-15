import React from 'react';

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { IntrospectionFragmentMatcher,InMemoryCache } from 'apollo-cache-inmemory';

import ArticleDetailView from '../Article/ArticleDetailView';
import introspectionQueryResultData from '../fragmentTypes.json';

import './App.css';


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});


const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:7100/gql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
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
