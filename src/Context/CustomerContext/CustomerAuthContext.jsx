import React, { useContext, useEffect, useState } from "react";

const customerAuthContext = React.createContext();

export function useCustomerAuth() {
  return useContext(customerAuthContext);
}

export const CustomerAuthProvider = ({ children }) => {

    const [isCustomerAuthnteicated, setIsCustomerAuthenticated] = useState(false)

    useEffect(()=> {
        const isAuthnticated = localStorage.getItem('customer')

        if(isAuthnticated !== null) {
            setIsCustomerAuthenticated(true)
        }else {
            setIsCustomerAuthenticated(false)
        }
    },[])
  
  
    return (
      <customerAuthContext.Provider
        value={{
            isCustomerAuthnteicated
        }}
      >
        {children}
      </customerAuthContext.Provider>
    );
  };
  