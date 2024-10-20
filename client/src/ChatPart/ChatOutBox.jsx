import React from 'react'
import './ChatInterface.css'
const ChatOutBox = (props) => {
  if(props.bool==1){
    return (
      <div className="chat-out-cont-user">
      <div className="chat-out-box" >{props.text}</div>
     
      </div>
      
    )
  }
  if(props.bool==0){
    return (
      <div className='chat-out-cont-bot'>
      <div className="chat-out-box" >{props.text}</div>
      
      </div>
      
    )
  }
  // return (
  //   <div className={`${props.bool==1? 'chat-out-cont-user': 'chat-out-cont-bot'}`}>
  //   <div className="chat-out-box" >{props.text}</div>
  //   <input type='text' />
  //   </div>
    
  // )
}

export default ChatOutBox
