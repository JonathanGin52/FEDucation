import React from 'react';
import {Query} from 'react-apollo';
import {
  Card,
  Page,
  ResourceList,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  TextStyle,
} from '@shopify/polaris';

import allProducts from '../queries/getProducts';

const renderResourceListItem = (product) => {
  const {id, name, description, price} = product;
  return (
    <ResourceList.Item
      id={id}
      url={`/products/${id}`}
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
    );
  }
}
