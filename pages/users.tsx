import React from "react";

import PrivateRoute from "../src/components/Auth/PrivateRoute/PrivateRoute";

const Users = () => (
  <PrivateRoute>
    <div>Users</div>
  </PrivateRoute>
);

export default Users;
