import React,{createContext,useContext} from 'react'

const ClientContext = createContext()

export const useClient=()=>useContext(ClientContext)




function ClientContextProvider({value,children}) {
  return (
    <ClientContext.Provider value={value}>
        {children}
    </ClientContext.Provider>
  )
}

export default ClientContextProvider