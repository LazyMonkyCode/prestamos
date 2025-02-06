import React from "react"

  function Tag({label,type}) {

    return (<span className={`
      ${type=="primary" ?"bg-primary  ":""}
          ${type=="warning" ?"bg-warning ":""}
          ${type=="danger" ? "bg-danger ":""}
          ${type=="success" ? "bg-success ":""}
          text-white rounded-md p-1 text-sm mr-1 
      `}>{label}</span>)
  }


  export  default Tag