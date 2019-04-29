import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, Mutation} from 'react-apollo';
import TextInput from './TextInput';

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

const ADD_PRODUCT = gql`
  mutation createProduct($name: String!, $description: String, $price: Float!) {
    createProduct(name: $name, description: $description, price: $price) {
      product {
        id
        name
        description
        price
      }
    }
  }
`;

class ProductForm extends React.Component {
  state = {
    name: '',
    description: '',
    price: 0,
  };

  handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (addProduct) => {
    const {name, description} = this.state;
    const price = parseFloat(this.state.price);

    addProduct({variables: {name, description, price}});
  };

  render() {
    const {name, description, price} = this.state;

    return (
      <ApolloProvider client={CLIENT}>
        <Mutation mutation={ADD_PRODUCT}>
          {(addProduct) => {
            return (
              <form onSubmit={(evt) => {
                evt.preventDefault();
                this.handleSubmit(addProduct);
              }}
              >
                <TextInput
                  name="name"
                  label="Product name"
                  value={name}
                  onChange={this.handleChange}
                />
                <TextInput
                  name="description"
                  label="Description"
                  value={description}
                  onChange={this.handleChange}
                />
                <TextInput
                  name="price"
                  label="Price"
                  value={price}
                  onChange={this.handleChange}
                />
                  <button type="submit">Add Product</button>
              </form>
            );
          }}
        </Mutation>
      </ApolloProvider>
    );
  }
}

export default ProductForm;
