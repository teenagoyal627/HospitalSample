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
              <li>
                <a href="/login" className="link"  style={{ position: "relative", right: "0", marginRight: "30px", }} >
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
