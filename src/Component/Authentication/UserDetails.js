import React, { useState } from "react";
import "./UserDetails.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { getAuth } from "firebase/auth";
import HomePageNavigation from "../Header/HomePageNavigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function UserDetails() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [photo, setPhoto] = useState("");
  const[error,setError]=useState("")
  const[photoFile,setPhotoFile]=useState("")

  const validation=()=>{
    const isValidPhoneNumber= /^\d{10}$/.test(mob)

    if(!isValidPhoneNumber){
      setError("Enter a valid 10 digit phone number  ")
    }
    else{
      setError("")
    
    }
   
}
    const emailId=getAuth().currentUser.email;
   // console.log(emailId)
  async function submitHandler(e) {
    console.log("save button is clicked")
    e.preventDefault();
    try {
      console.log(getAuth());
      const userId = getAuth().currentUser.uid;
        console.log("the user id in user details form is ",userId);
      // Update the Firestore document with the user details
     let imageUrl=null
      if(photoFile){
      const imageName = `${photoFile.name}`;
      const imageRef = ref(storage, `UserDetails/${imageName}`);
      const snapshot = await uploadBytes(imageRef, photoFile);
      imageUrl = await getDownloadURL(snapshot.ref);
     }
      await updateDoc(doc(db, "users", userId), {
        Name: name,
        PhoneNumber: mob,
        image:imageUrl
      });
  history.replace("/shop")
      setName("");
    setMob("");
    setPhoto("");
      console.log("User details updated successfully");
    } catch (error) {
      console.log("Error updating user details:", error);
    }
  }
  const handleImagechange=(e)=>{
    const ImageObject=e.target.files[0]
    if(ImageObject){
      setPhotoFile(ImageObject)
      const reader=new FileReader();
      reader.onloadend=()=>{
        setPhoto(reader.result)
      }
      reader.readAsDataURL(ImageObject)
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
        <div className="image-upload-section">
          <div className="image-upload-box">
            <input type="file" accept="image/*" required style={{width:"15rem",marginRight:"1.5rem",marginLeft:".1rem"}}
            onChange={handleImagechange} 
            />
            {photo && (
              <img src={photo} alt="UserImage" className="image-preview" style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>
        </div>
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
