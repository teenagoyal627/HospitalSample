import React from 'react'
import './Home.module7.css'
const HomePageNavigation = () => {
  return (
    <div>
       <nav>
        <div className="nav-bar">
          <a href="/" className="logo">
            <h1>Medical Shop Managment System</h1>
          </a>
          <div>
            <ul >
              {/* <li>
                <p style={{color:"white"}}>Click here to Login/Signup</p>
              </li> */}
              <li>
                <a href="/login" className="link" style={{ marginRight: "30rem" }} >
                  Login
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HomePageNavigation
