import {gql} from 'apollo-boost';

export default gql`
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
