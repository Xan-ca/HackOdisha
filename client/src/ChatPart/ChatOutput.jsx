import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatOutBox from './ChatOutBox'
import { TextContext } from '/src/ContextProviders/TextContextProvider';


const LoadAllChat=()=>{
  const [strin,setStrin]=useContext(TextContext)
  const bottomOfPanelRef=useRef(null)

useEffect(()=>{
  if(bottomOfPanelRef.current){
  bottomOfPanelRef.current.scrollIntoView({behavior:'smooth'});}
},[strin])
   
    return (
    <>
    {strin.map((item,index)=><ChatOutBox  bool={parseInt(item[1])} text={item[0]} key={index}/>)}
    <div ref={bottomOfPanelRef}></div>
    </>
    )
    
}
const ChatOutput = () => {
   
  return (
    <div className='chat-output'>
      {LoadAllChat()}
    </div>
  )
}

export default ChatOutput
