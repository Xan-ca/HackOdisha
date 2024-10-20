//all chat component goes here
import React from 'react'
import './ChatInterface.css'
import ChatInputBox from './ChatInputBox'
import ChatOutput from'./ChatOutput'

const ChatInterface = () => {
 

  return (
    <>
    <section className="nav-bar">
            <div className="logo">Amuse Trip</div>
            <ul className="menu">
                <li><a href="/home">Home</a></li>
                <li><a href="#">Tours</a></li>
                <li><a href="/chat">Chat Support</a></li>
                <li><a href="/mytickets">My Tickets</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
        </section>
    <div className='chat-interface'>
      
      <ChatOutput/>
      <ChatInputBox/>
    </div>
    </>
  )
}

export default ChatInterface
