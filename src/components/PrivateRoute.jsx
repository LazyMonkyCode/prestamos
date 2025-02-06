import React from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

    
    const {user,token} = useAuth();

   // console.log(user)
    // Check if the user is authenticated
    if ( token==null ) {
      // If not authenticated, redirect to the login page
      //console.log("heres")
      return <Navigate to="/auth/signin" />;
    }
    
    console.log("heres")
    // If authenticated, render the child routes
    return <Outlet></Outlet>
  };
export default PrivateRoute