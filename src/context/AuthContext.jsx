

import React,{useEffect,useState,createContext,useMemo} from "react";

import { useJwt } from "react-jwt";

const AuthContext = createContext()



const AuthProvider =({children})=>{

    const [user,setUser] = useState(null)
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const { decodedToken, isExpired } = useJwt(token);

    
    
    const setToken = (newToken) => {
        setToken_(newToken);
      };

    

      
      useEffect(() => {
        if (token) {
          localStorage.setItem('token',token);  
         
        } else {
          
          localStorage.removeItem('token')
        }
      }, [token]); 
    
      // Memoized value of the authentication context
      const contextValue = useMemo(
        () => ({
          token,
          setToken,
        }),
        [token]
      );

  
      const authenticate=(user)=>{
          setUser(user)
      }
    return (<AuthContext.Provider value={{
        user,
        setUser,
        setToken,
        token
    }}>
        {children}
    </AuthContext.Provider>)
}


export {AuthContext}

export default  AuthProvider