import React,{createContext,useContext} from 'react'

const DashContext = createContext()
export  const useDash=()=>useContext(DashContext)




function DashContextProvider({value,children}) {
  return (
    <DashContext.Provider value={value}>
        {children}
    </DashContext.Provider>
  )
}

export default DashContextProvider