import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { hot } from 'react-hot-loader';
import App from '../_App';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

export default hot(module)(Root);
