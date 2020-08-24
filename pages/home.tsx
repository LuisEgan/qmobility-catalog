import React, { FC } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";

import PrivateRoute from "../src/components/Auth/PrivateRoute/PrivateRoute";
import { IPrivateComponentsDefaults } from "../src/lib/Types";

interface IHome extends IPrivateComponentsDefaults {}

const Home: FC<IHome> = (props: IHome) => {
  const { token } = props;

  // const { data } = useQuery(gql`
  //   query Consumers {
  //     consumers {
  //       id
  //       name
  //     }
  //   }
  // `);

  return (
    <PrivateRoute>
      <div>Home</div>
      <div>{token}</div>
    </PrivateRoute>
  );
};

export default Home;
