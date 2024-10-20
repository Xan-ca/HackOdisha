import React, { useState } from 'react'
export const TextContext=React.createContext()
const TextContextProvider = ({children}) => {
    const [strin,setStrin]=useState([])
  return (
    <TextContext.Provider value={[strin,setStrin]}>
      {children}
    </TextContext.Provider>
  )
}

export default TextContextProvider
