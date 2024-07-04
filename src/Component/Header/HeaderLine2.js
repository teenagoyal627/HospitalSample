
import React, { useState } from 'react'
import './HeaderLine.css'
// import {FaBars} from 'react-icons/fa'
// import {FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const HeaderLine2 = () => {

    const[click,setClick]=useState(false);
    const[color,setColor]=useState(false)
   
    const handleClick =()=>{
       setClick(!click)
    }
    const changeColorHandler=()=>{
      if(window.scrollY >=100){
        setColor(true)
      }else{
        setColor(false)
      }
    }
    window.addEventListener("scroll",changeColorHandler)
  return (
    <div className={color ? "header header-bg" : "header"}>
 <a href="/" className="logo">
            <h1>Medical Shop Managment System</h1>
           
          </a>   
             <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li><Link to='shop' > Shop Details</Link></li>
                    <li><Link to='inventory' >Inventories</Link></li>
                    <li><Link to='createBill' > Create Bill</Link></li>
                    <li><Link to='allBill' >All Bill</Link></li>
                    <li><Link to='logout' >Logout</Link></li>
                </ul>
      {/* <div className="hamburger" onClick={handleClick}>
      {click ? (<FaTimes size ={20} style={{color:"white"}}/>
       ):(<FaBars size ={20} style={{color:"white"}}/>
)}

      </div> */}
    </div>
  )
}

export default HeaderLine2

