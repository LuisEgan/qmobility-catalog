import React from "react";

import PrivateRoute from "../components/Auth/PrivateRoute/PrivateRoute";

const Home = ({}) => {
  console.log("USERS!");
  return (
    <PrivateRoute>
      <div>Users</div>
    </PrivateRoute>
  );
};

export default Home;
