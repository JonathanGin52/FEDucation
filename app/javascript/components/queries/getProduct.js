import {gql} from 'apollo-boost';

export default gql`
  query Product($id: ID) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`;
