import React from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from 'react-apollo';
import TextInput from './TextInput';

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
    );
  }
}

export default ProductForm;
