import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import store from '-/redux/store';
import App from '../App';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const Root = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

export default Root;
