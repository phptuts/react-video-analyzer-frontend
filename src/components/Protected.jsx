import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isLoggedIn, isFirebaseActive } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn && isFirebaseActive) {
      navigate("/");
    }
  }, [isLoggedIn, isFirebaseActive]);
  if (!isFirebaseActive) {
    return <h1>Loading...</h1>;
  }
  return <>{children}</>;
};

export default Protected;
