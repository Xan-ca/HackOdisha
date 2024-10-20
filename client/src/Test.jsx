import React from 'react'
import { useState } from 'react'
import './tickets.css'
import { useEffect } from 'react'


const Test = () => {
  const [tickets,setTickets]=useState([]);
    useEffect(()=>{
     const fetchplaces =async () => {
        const response =await fetch(`http://localhost:9000/Tickets`);
        const places=await response.json();
        setTickets(places);
     };
     fetchplaces();
    }
    ,[]);
  return (
   
      tickets.map(function(ticket,index){
        <div key={index}>
                 <div class="ticket ticket-1">
  
                 <div class="date">
                   <span class="day">{ticket.validat}</span>
                   <span class="month-and-time"><span class="small">10:00 AM-5:00 PM </span></span>
                   
                 </div>
               
                 <div class="artist">
                   <span class="name">AMUSE TRIP</span>
                  
               
                 </div>
               
                 <div class="location">
                   <span>{ticket.museumname}</span>
                  
                 </div>
 </div>
               </div>   
                })
                
      

    
  )
}

export default Test


