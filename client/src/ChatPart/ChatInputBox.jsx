//input prompt goes here
import React, { useContext, useState } from 'react'
import './ChatInterface.css'
import { TextContext } from '../ContextProviders/TextContextProvider';

import run from './ChatBot';

const ChatInputBox= () => {
  const [strin,setStrin]=useContext(TextContext)
  

  const[input,setInput]= useState("")
  const user="0";


  
  const submitHandle=()=>{
   // setInput(document.querySelector(".chat-input").value)
   if(input){
    console.log(input)
    setStrin(strin=>[...strin,[input,user]])
    async function foo() {
      const res= await run(input);
     
      setStrin(strin=>[...strin,[res,"1"]]) 
    }
    foo()
    
    
  }
    setInput("")
    
   
  }

  //console.log(texts)
  return (
    
    <div className='chat-box'>
      
    <input className="chat-input"  placeholder='Message' type='text' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
    <img className="arrow_up" onClick={submitHandle}src="./src/assets/arrow_upward.png"  />
    </div>
  )
}

export default ChatInputBox

