import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {AppProvider} from '@shopify/polaris';

import ProductList from './routes/ProductList';
import ProductForm from './routes/ProductForm';
import ProductDetails from './routes/ProductDetails';
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

const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <AppProvider linkComponent={CustomLinkComponent}>
      <ApolloProvider client={CLIENT}>
        <Router>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products/new" component={ProductForm} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AppProvider>
  );
};

export default App;
