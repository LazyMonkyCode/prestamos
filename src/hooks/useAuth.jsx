

import React,{useContext} from "react";

import { AuthContext } from "../context/AuthContext.jsx";



export  const useAuth=() => {
    
    const c = useContext(AuthContext)

    //console.log(c)
    return c
}