import React, { useState } from "react";
import "./UserDetails.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { getAuth } from "firebase/auth";
import HomePageNavigation from "../Header/HomePageNavigation";

function UserDetails() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [photo, setPhoto] = useState("");
  const[error,setError]=useState("")

  const validation=()=>{
    const isValidPhoneNumber= /^\d{10}$/.test(mob)

    if(!isValidPhoneNumber){
      setError("Enter a valid 10 digit phone number  ")
    }
    else{
      setError("")
      history.replace("/shop")
      setName("");
    setMob("");
    setPhoto("");
    }
   
}
    const emailId=getAuth().currentUser.email;
   // console.log(emailId)
  async function submitHandler(e) {
    e.preventDefault();
    try {
      console.log(getAuth());
      const userId = getAuth().currentUser.uid;
        console.log("the user id in user details form is ",userId);
      // Update the Firestore document with the user details
      await updateDoc(doc(db, "users", userId), {
        Name: name,
        PhoneNumber: mob,
        Image:photo,
      });
      console.log("User details updated successfully");
    } catch (error) {
      console.log("Error updating user details:", error);
    }
  }

  return (
    <div>
    <HomePageNavigation/>
    {/* <Profile/> */}
    <div className="forms">
      <div>
        <h1 className="heading">User Details</h1>
      </div>
      <form onSubmit={submitHandler}>
        {/* {console.log("onsubmit wala function")} */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            id="number"
            placeholder="(0000) 0000-00"
            required
            value={mob}
            onChange={(e) => setMob(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={emailId}
            disabled
          /> 
        </div>
        <div>
          <label>Upload Profile Image</label>
          <input
            type="file"
            className="photo"
            required
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={validation}>Save</button>
          {error && <p style={{color:"red",marginTop:"1rem",marginLeft:"1rem"}}>{error}</p>}
        </div>
      </form>
    </div>
    </div>
  );
}

export default UserDetails;
