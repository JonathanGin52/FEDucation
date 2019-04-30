import React from 'react';
import {gql} from 'apollo-boost';
import {Query, Mutation} from 'react-apollo';
import {
  Card,
  Layout,
  Page,
  SkeletonBodyText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris';

import NotFound from './NotFound';

const getProduct = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`;

const deleteProductMutation = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      product {
        id
        name
        description
        price
      }
    }
  }
`;

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  deleteProduct = (deleteProduct) => {
    deleteProduct({
      variables: {id: this.state.id},
    });
  };

  render() {
    const loadingStateContent = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <TextContainer>
              <SkeletonBodyText />
              <SkeletonBodyText />
            </TextContainer>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
    const {id} = this.state;

    return (
      <Query query={getProduct} variables={{id}}>
        {({loading, data}) => {
          if (loading) {
            return loadingStateContent;
          }
          if (!data) {
            return <NotFound />;
          }
          return (
            <Page
              title={data.product.name}
              breadcrumbs={[{content: 'All products', url: '/'}]}
            >
              <Mutation mutation={deleteProductMutation}>
                {(deleteProduct) => (
                  <Card
                    title={data.product.name}
                    primaryFooterAction={{
                      content: 'Delete product',
                      onAction: () => this.deleteProduct(deleteProduct),
                      url: '/',
                    }}
                    sectioned
                  >
                    <p>{data.product.description}</p>
                  </Card>
                )}
              </Mutation>
            </Page>
          );
        }
      }
      </Query>
    );
  }
}

export default ProductDetails;
