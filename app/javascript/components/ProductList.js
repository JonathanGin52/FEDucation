import React from 'react';
import {
  AppProvider,
  Card,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';
// import PropTypes from "prop-types";

class ProductList extends React.Component {
  state = {
    isLoading: true,
    hasError: false,
    products: [],
  };

  render() {
    const {isLoading, hasError, products} = this.state;

    const loadingStateContent = isLoading ? (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="medium" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    ) : null;

    return (
      <AppProvider>
        <Page title="Products">
          {loadingStateContent}
        </Page>
      </AppProvider>
    );
  }
}

export default ProductList;
