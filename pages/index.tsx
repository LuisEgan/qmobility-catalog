import { useEffect } from "react";
import Router from "next/router";

const Index = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      Router.push("/home");
    } else {
      Router.push("/login");
    }
  }, []);

  return null;
};

export default Index;
