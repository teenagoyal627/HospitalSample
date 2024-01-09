import { useEffect } from "react";
import { Link } from "react-router-dom";
import Signup from "../Authentication/Signup";
import HomePageNavigation from "./HomePageNavigation";
import './Home.module7.css'
function Home() {
  useEffect(() => {
    setTimeout(() => {
      <Signup />;
    }, 2000);
  }, []);
  return (
    <div>
      <HomePageNavigation />
      <header>
        <div className="header-section flex container">
          <div className="header-left">
            <h1>Best Services for Best Customers</h1>
            <p>The dashboard of the medical business management system allows the owner to produce and manage invoices, track inventories, and save customer bills.</p>
            <button className="button">
              <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
                Get Started
              </Link>
            </button>
          </div>
          <div className="header-right">
            <img src="Images/1.jpg" alt="Home page"/>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="features-header flex">
            <h4 className="features-heading-text">One platform, endless functionality.</h4>
          </div>
          <hr />
          <div className="features-area flex">
            <a href="/signup" className="features-card" style={{ padding: "2rem", background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQgIeptiR_CMtAGiO4x8Knironnq-rID41KQ&usqp=CAU)" }}>
              <h5 className="features-text">Empower Your Business, Share Your Story: Seamless Shop Detail Entry!</h5>
            </a>

            <a href="/signup"
              className="features-card" style={{ maxWidth: "100%", background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://c8.alamy.com/comp/2AP4BNB/many-colorful-medicines-drugs-as-a-medicine-background-texture-2AP4BNB.jpg)" }}
            >
              <h5 className="features-text">Effortless Inventory Management: Peek into Your Stock, Anytime, Anywhere.</h5>
            </a>
            <a href="/signup" className="features-card" style={{ background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1AtMRiFzfBRpmFYAWVw1zm6XIi7xgblmNEA&usqp=CAU" }}>
              <h5 className="features-text">Billing at Your Fingertips: View, Verify, Print – Your Patients, Your Way.</h5>
            </a>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className=" container flex cta-section-container">
          <h2 style={{ color: "white" }}>Start testing today</h2>
          <div className="card">
            <h5 className="card-header">Medical Shop Managment System</h5>
            <div className="card-body">
              <p className="card-text">
                {" "}
                It is a system that allows a shop to handle information.
                we can write bills in it, view all of our invoices, and 
                examine the stock of medicines.You click the Signup button in 
                order to utilize this dashboard
                
              </p>
              <button className="button">
                <Link to="/signup" style={{ color: "black", textDecoration: "none" }}>
                  Signup
                </Link>
              </button>
              <button className="button">
                <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <br /><br />
    </div>
  );
}
export default Home;
