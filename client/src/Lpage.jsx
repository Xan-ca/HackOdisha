import React from 'react'
import './lpage.css'
const Lpage = () => {
  return (
    
      <section>
      <SearchBar/>
      <Imgslider/>
      </section>
    
  )
}
const SearchBar=()=>{
  return(
    <>
    <div className='searchbar'>
    <input className='searchinput' type="input"/>
    <img  className="srchimg"src='/src/pages/search.png'/>
        </div>
    </>
  )
}
const Imgslider=(props)=>{
    const museums=['./src/assets/museumimg/1.png','./src/assets/museumimg/2.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg','./src/assets/museumimg/4.jpg']
        return( <div className='wrapper'> <div className='imgSlider'>{museums.map((item,index)=><Imgcard src={item} key={index} />)}
                 
                 </div>
                 
                 </div>)
   }

const Imgcard=(props)=>{
       return(<>
         <div className='imgCard'>
           <img className='imgSrc' src={props.src}/>
           <div className='imgName'>Museums</div>
           <div className='imgInfo'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam blanditiis minima labore! Quibusdam exercitationem perferendis temporibus animi odit, blanditiis corporis excepturi aut cumque nostrum id. Iure, delectus libero! Nostrum eveniet illum, recusandae sunt sint laborum nulla reiciendis iste aliquam odit veritatis dolorem tenetur illo ipsa. Nemo minima beatae cumque quam.</div>
           <div className='priceInfo'>
            <div className='tag'>Price</div>
            <div className='price'>50$</div>
           </div>
         </div>
         
         </>
       )
   }
   
export default Lpage
