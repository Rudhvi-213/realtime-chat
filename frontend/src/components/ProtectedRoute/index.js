import { Navigate as Redirect, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookie.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// const PrivateRoute = () => {
//     const auth = null; // determine if authorized, from context or however you're doing it
//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/login" />;
// }
