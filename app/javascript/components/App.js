import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {AppProvider} from '@shopify/polaris';

import ProductList from './routes/ProductList';
import ProductForm from './routes/ProductForm';
import NotFound from './routes/NotFound';

const CLIENT = new ApolloClient({
  fetchOptions: {
    credentials: 'same-origin',
  },
  request: (operation) => {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    operation.setContext({
      headers: {"X-CSRF-Token": csrfToken},
    });
  },
});

const App = () => {
  return (
    <ApolloProvider client={CLIENT}>
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products/new" component={ProductForm} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
};

export default App;
