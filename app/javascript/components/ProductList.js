import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import {
  AppProvider,
  Card,
  Page,
  ResourceList,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  TextStyle,
} from '@shopify/polaris';

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

const allProducts = gql`
  {
    allProducts {
      id
      name
      description
      price
    }
  }
`;

const renderResourceListItem = (product) => {
  const {id, name, description, price} = product;
  return (
    <ResourceList.Item
      id={id}
    >
      <h3>
        <TextStyle variation="strong">{name}</TextStyle>
      </h3>
      <div>{description}</div>
    </ResourceList.Item>
  );
};

export default class ProductList extends React.Component {
  render() {
    const loadingStateContent = (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="medium" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    );

    return (
      <AppProvider>
        <ApolloProvider client={CLIENT}>
          <Page
            title="Products"
            secondaryActions={[
              {content: 'Add product', url: '/products/new'},
            ]}
          >
            <Query query={allProducts}>
              {
                ({loading, data}) => {
                  if (loading) {
                    return loadingStateContent;
                  }
                  return (
                    <Card>
                      <ResourceList
                        resourceName={{singular: 'product', plural: 'products'}}
                        items={data.allProducts}
                        renderItem={(product) => renderResourceListItem(product)}
                      />
                    </Card>
                  );
                }
              }
            </Query>
          </Page>
        </ApolloProvider>
      </AppProvider>
    );
  }
}
