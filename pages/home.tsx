import React, { FC } from "react";

import PrivateRoute from "../src/components/Auth/PrivateRoute/PrivateRoute";
import { IPrivateComponentsDefaults } from "../src/lib/Types";

interface IHome extends IPrivateComponentsDefaults {}

const Home: FC<IHome> = (props: IHome) => {
  const { token } = props;

  return (
    <PrivateRoute>
      <div>Home</div>
      <div>{token}</div>
    </PrivateRoute>
  );
};

export default Home;
