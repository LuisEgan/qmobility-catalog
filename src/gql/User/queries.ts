import { gql } from "apollo-boost";

const user = gql`
  query User {
    user {
      name
    }
  }
`;

export default {
  user,
};
