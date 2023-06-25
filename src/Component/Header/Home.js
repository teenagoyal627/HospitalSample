import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../Authentication/Signup';
import classes from './Home.module.css'
function Home()
 {
      useEffect(()=>{
        setTimeout(()=>{
          <Signup/>
          console.log("hii");
                },2000)
        
      },[])
    return(
      <div className="card">
      <h5 className="card-header">Hospital Managment System</h5>
      <div className="card-body">
        <p className="card-text">  It is a system enabling hospitals to manage information and in this we can create bill,we can see all bills of our shop and also see the stoke of medicines.if you wants to use this application click on Signup button.</p>
        <button className={classes.button}>
        <Link to='/signup' style={{textDecoration:'none'}}>signup</Link>
     </button>
     
     


      </div>

    </div>
   
)}
export default Home;