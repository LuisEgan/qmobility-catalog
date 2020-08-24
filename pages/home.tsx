import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import PrivateRoute from "../components/Auth/PrivateRoute/PrivateRoute";

const Home = ({ token }) => {
  const { data } = useQuery(gql`
    query Consumers {
      consumers {
        id
        name
      }
    }
  `);
  return (
    <PrivateRoute>
      <div>Home</div>
    </PrivateRoute>
  );
};

export default Home;
