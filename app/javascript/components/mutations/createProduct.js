import {gql} from 'apollo-boost';

export default gql`
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
