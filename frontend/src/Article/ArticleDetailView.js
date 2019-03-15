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
        url
      }
    }
  }
}
`

const ArticleDetailView = (data) => {
  return (
    <Query query={query}>
     {({ loading, error, data }) => {

      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      console.log(data.firstArticle)

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
