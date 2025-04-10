import { useState,useContext,createContext } from "react";

const dataContext=createContext()
export const DataProvider=({children})=>{
  return(
    <dataContext.Provider value={{}}>
      {children}
    </dataContext.Provider>
  )
}

export const useData=()=>useContext(dataContext)