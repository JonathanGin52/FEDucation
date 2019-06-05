import {gql} from 'apollo-boost';

export default gql`
  {
    allProducts {
      id
      name
      description
      price
    }
  }
`;
