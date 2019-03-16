import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import Article from './Article';

const query = gql`
{
  firstArticle {
    id
    title
    sections {
      ... on TextSection {
        id
        text
      }
      ... on ImageSection {
        id
        src
      }
    }
  }
}
`

const ArticleDetailView = (data) => {
  return (
    <Query query={query} pollInterval={500}>
     {({ loading, error, data }) => {

      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <Article
          {...data.firstArticle}
        />
      );
     }}
    </Query>
  );
};

export default ArticleDetailView;
