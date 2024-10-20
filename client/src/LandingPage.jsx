import { useEffect, useState } from 'react'
import './index.css'
import './ticketform.css'
import Lpage from './Lpage'
import { Navigate, useNavigate } from 'react-router-dom'
//import ChatBotAI from './ChatPart/ChatBot.jsx'

function LandingPage() {
    
//ChatBotAI("hi")
  return (
   <>
    <section className="nav-bar">
            <div className="logo">Amuse Trip</div>
            <ul className="menu">
                <li><a className='opt' href="/home">Home</a></li>
                <li><a className='opt'  href="/">Tours</a></li>
                <li><a className='opt'  href='/chat'>Chat Support</a></li>
                <li><a className='opt'  href="/mytickets">My Tickets</a></li>
                <li><a className='opt'  href="/">About us</a></li>
                <li><a className='opt'  href="/">Contact us</a></li>
            </ul>
        </section>
        <Banner/>
        <Services/>
       <Place/>
        <Footer/>
     
   </>
  )
}
const Banner=()=>{
  return(
  <section className="banner">
  <div className="banner-text-item">
      <div className="banner-heading">
          <h1>Book your Next Museum tour!</h1>
      </div>
      <TicketingForm/>
  </div>
</section>
)
}
const TicketingForm = () => {
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [museumname,setMuseumName]=useState("");
    const [date,setDate]=useState("");
    const [num,setNum]=useState(0);
    const submithandler=(e)=>{
        e.preventDefault();
       
        
     const bookinginp ={
        username:name,
        museumname:museumname,
        ticketsbooked:num,
        validat:date
        
     }
     console.log(bookinginp)

     fetch('http://localhost:9000/Tickets',{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      credentials:'include',
      body:JSON.stringify(bookinginp)
     })
     .then(Response=>Response.json())
     .then((response)=>{console.log("");
       console.log(response);
     })
     .catch(error=>console.error(error));
        setName("")
        setLocation("")
        setMuseumName("")
        setNum(0)
        setDate("")  
    }
  return (
  <>
    <div className="ticket-section">
        <form id="ticket-form">
            <div className='title-form'><h2>Book Museum Ticket</h2></div>
            <input className='inp' onChange={(e)=>setName(e.target.value)} value={name} type="text" id="name" placeholder="Name" required/><br/>
            <input className='inp' onChange={(e)=>setLocation(e.target.value)} value={location} list="mylist" type="text" id="from" placeholder="Location" required/><br/>
            <datalist id="mylist">
              <option>Lucknow</option>
              <option>Cuttack</option>
              <option>Kolkata</option>
              <option>Fradiabad</option>
              <option>Jajpur</option>
              <option>Surat</option>
          </datalist>
            <input className='inp' onChange={(e)=>setMuseumName(e.target.value)} value={museumname} type="text" id="to" placeholder="Museum" required/><br/>
            <input className='inp' onChange={(e)=>setNum(e.target.value)} value={num} type="number" id="seat" placeholder="Number of bookings" required/><br/>
            <input className='inp' onChange={(e)=>setDate(e.target.value)} value={date} type="date" id="date" required/><br/>
           
            <input className='sub' onClick={(e)=>submithandler(e)}  type="submit" value="Book Ticket"/><br/>
        </form>  
    </div>
</>
)}
const Services=()=>{
  return (
<section className="services">
    <div className="service-item">
        <img src="https://res.cloudinary.com/dxssqb6l8/image/upload/v1605293634/tour-guide_onzla9.png"/>
        <h2>24/7 Online support</h2>
    </div>
    <div className="service-item">
        <img src="https://res.cloudinary.com/dxssqb6l8/image/upload/v1605293738/reliability_jbpn4g.png"/>
        <h2>100% Trusted Tour Agency</h2>
    </div>
    <div className="service-item">
        <img src="https://res.cloudinary.com/dxssqb6l8/image/upload/v1605293635/experience_a3fduk.png"/>
        <h2>AI Chat Features</h2>
    </div>
    <div className="service-item">
        <img src="https://res.cloudinary.com/dxssqb6l8/image/upload/v1605293634/feedback_s8z7d9.png"/>
        <h2>Book Your Ticket Now</h2>
    </div>
</section>
  )
}
const Place=()=>{
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
     const fetchplaces =async () => {
        const response =await fetch(`http://localhost:9000/Museums`);
        const places=await response.json();
        //console.log(places);
        setPlaces(places);
     };
     fetchplaces();
    }
    ,[]);
    return(
        <>
        <section className="places">
            <div className="places-text">
                <small>FEATURED TOURS PACKAGES</small>
                <h2>Favourite Places</h2>
            </div>

            <div className="cards">
                {places.map(function(place,index){
                    if(index<9)
                    return(
                        <PlaceCard key ={index} imgsrc={place.museumimg} name={place.museumname} location={place.museumlocation} price={place.museumcost}/>
                    )
                })
                }
                </div>
                </section>
        </>
    )
}
const PlaceCard=(props)=>{
return(
    <>
                <div className="card">
                    <div className="zoom-img">
                        <div className="img-card">
                            <img src={props.imgsrc}/>
                        </div>
                    </div>

                    <div className="text">
                        <span className="rating">⭐⭐⭐⭐⭐</span>
                        <h2>{props.name}</h2>
                        <p className="cost">₹{props.price} / Per Person</p>
                        <div className="card-box">
                            <p className="time">🕓 10:00am-5:00pm</p>
                            <p className="location">{props.location}</p>
                        </div>
                    </div>

                </div>
    </>
)
}
const Footer=()=>{

    return(
        <>
         
        <div>
        <section className="about">
        <div className="about-img">
            <img src="./src/assets/museumimg/3.jpeg"/>
        </div>
        <div className="about-text">
            <small>ABOUT OUR COMPANY</small>
            <h2>We are Museum Booking Support Company</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud</p>

            <label><input type="checkbox" defaultChecked/>Lorem ipsum dolor sit amet</label>
            <label><input type="checkbox" defaultChecked/>consectetur adipisicing elit</label>
            <label><input type="checkbox" defaultChecked/>Architecto atque consequuntur</label>
            <label><input type="checkbox" defaultChecked/>cupiditate doloremque ducimus</label>
            <a href="#">ABOUT US</a>
        </div>
    </section>

   
    <div className="footer">
        <div className="links">
            <h3>Quick Links</h3>
            <ul>
                <li>Offers & Discounts</li>
                <li>Get Coupon</li>
                <li>Contact Us</li>
                <li>About</li>
            </ul>
        </div>
        
        <div className="links">
            <h3>Support</h3>
            <ul>
                <li>Frequently Asked Questions</li>
                <li>Report a Payment Issue</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
    </div>
    </div>
    </>
    )
}




export default LandingPage