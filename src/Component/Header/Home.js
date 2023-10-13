import { useEffect } from "react";
import { Link } from "react-router-dom";
import Signup from "../Authentication/Signup";
import HomePageNavigation from "./HomePageNavigation";
function Home() {
  useEffect(() => {
    setTimeout(() => {
      <Signup />;
      console.log("hii");
    }, 2000);
  }, []);
  return (
    <div>
     <HomePageNavigation/>
      <header>
        <div className="header-section flex container">
          <div className="header-left">
            <h1>Medical Shop Managment System </h1>
            <p> Medical store managment system is a web application in which store owner can track inventory,All Bills and create the bills of customer.</p>
            <button className="button">
              <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
                Get Started
              </Link>
            </button>
          </div>
          <div className="header-right">
            <img src="Images/1.jpg" alt="" />
          </div>
        </div>
      </header>
      
      <section className="features-section">
        <div className="container">
          <div className="features-header flex">
            <h4 className="features-heading-text">One platform, endless functionality.</h4>
          </div>

          <div className="features-area flex">
            <a href="/signup" className="features-card" style={{ padding: "2rem" }}>
              <h5 className="features-text">Can user fill their own Shop Details</h5>
            </a>

            <a href="/signup" className="features-card" style={{ background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrWgmWx8_fljVAL3PvluSfkvx8blKACyLyg&usqp=CAU)" }}>
              <h5 className="features-text">Can user check the inventory</h5>
            </a>


            <a href="/signup" className="features-card" style={{ background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfr7ciM1dAShd_vQr4bg9MQwaTDeQl0u_8UkejjJj6nRAT97YaN_YaOq3vRimkYbFsBI8&usqp=CAU)", }}>
              <h5 className="features-text">Can user create the bill of the patient</h5>
            </a>

            <a href="/signup" className="features-card" style={{ background: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1AtMRiFzfBRpmFYAWVw1zm6XIi7xgblmNEA&usqp=CAU" }}>
              <h5 className="features-text">Can user check and print the bill of patients</h5>
            </a>

          </div>





        </div>
      </section>
      {/* this code is used in various other projects in this the text and image is properly align with each other
      <section className="section">
        <div className="section-container flex container">
          <div className="section-img">
            <img src="Images/6.jpg" alt="" />
          </div>
          <div className="section-desc flex">
            <h3>Objective of Medical Managment System</h3>
            <h5>Manage the details of Medical Shop, Stocks, Inventory,Bills.</h5>
            <p>This website can be used by shop owner, pharmacists,staff and other stakeholders involved in the medical shop's operations.</p>
          </div>
        </div>
      </section>
<br/><br/> */}
      {/* <section className="section">
        <div className="section-container flex container">
         
          <div className="section-desc flex">
            <h3>Key Features of this project:</h3>
            <h5>1.Inventory Management</h5>
            <h5>2.Billing Process</h5>
            <h5>3.Create Bill.</h5>
          </div>
          <div className="section-img">
            <img src="Images/8.jpeg" alt=""  style={{width:"50%"}}/>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container flex container">
          <div className="section-img">
            <img src="Images/6.jpg" alt="" />
          </div>
          <div className="section-desc flex">
            <h1>asdfafgsddddddddddfa</h1>
            <h3>dffsddddddddddddddda</h3>
            <p>jadfsfdddddddddddddddddddddddddddddddddddddhka</p>
          </div>
        </div>
      </section>h */}

      {/* cta section  */}

      <section className="cta-section">
        <div className=" container flex cta-section-container">
          <h2 style={{ color: "white" }}>Start testing today</h2>
          <div className="card">
            <h5 className="card-header">Medical Shop Managment System</h5>
            <div className="card-body">
              <p className="card-text">
                {" "}
                It is a system enabling hospitals to manage information and in this
                we can create bill,we can see all bills of our shop and also see the
                stoke of medicines.if you wants to use this application click on
                Signup button.
              </p>
              <button className="button">
                <Link to="/signup" style={{ color: "black", textDecoration: "none" }}>
                  signup
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
      {/* <div className="footer">
  <div className="footer-continer container flex">
    <p>@copyRight</p>
  </div>
</div> */}

    </div>
  );
}
export default Home;
