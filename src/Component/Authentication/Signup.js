import React, {  useState } from "react";
import "./Signup.css";
import { auth, db } from "../../Firebase";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import HomePageNavigation from "../Header/HomePageNavigation";

const Signup = (shopId) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible,setVisible]=useState(false);
  

  
  const Validation =()=>{
    const regExEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const regExPass = "^(?=.*[0-9])"
    + "(?=.*[a-z])(?=.*[A-Z])"
    + "(?=.*[@#$%^&+=])"
    + "(?=\\S+$).{8,20}$";  
    const regExUser=  "^[A-Za-z][A-Za-z0-9_]{4,29}$";
     if(regExEmail.test(email) && regExPass.match(password) && regExUser.match(userName)){
        console.log("valid email")
      }else if(!regExEmail.test(email) && email===""  &&  !regExPass.match(password) && password==="" && !regExPass.match(userName) && userName===""){
        alert("Check Email and enter strong password")
        history.replace('/signup')
      }
      else{
        alert("successfully signup");
      }
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //get the current user ID
      const auth = getAuth();
      // console.log(auth)
      // console.log(typeof(auth))

      const userCrediential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCrediential)
      console.log(typeof(userCrediential))
      const userId = userCrediential.user.uid;
      //check user id is present or not
      if (userId != null) 
      console.log(userId);
      console.log(typeof(userId))
      // const userRef = doc(db, "users", userId);
      // const userSnap = await getDoc(userRef);
      // if (userSnap.exists()) {
      //   alert("email already exists ");
      // }
      history.replace("/userDetails");

      const dateAndTime = new Date();
      await setDoc(doc(db, "users", userId), {
        UserName: userName,
        Email: email,
        CreatedAt: dateAndTime,
        UpdatedAt: dateAndTime,
        ShopId:shopId
      });
      // const docRef = doc(db, "users", userId);
      // const docSnap = await getDoc(docRef);
      // if (!docSnap.exists()) {
      //   await setDoc(docRef, {
      //     UserName: userName,
      //     Email: email,
      //     CreatedAt: dateAndTime,
      //     UpdatedAt: dateAndTime,
      //   });
      // }
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email already in use !");
          break;
        default:
          break;
      }
    }
  };

  const googleHandler = () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          GoogleAuthProvider.credentialFromResult(result);
          history.replace("/userDetails");
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            alert("email already used");
            var pendingCred = error.credential;
            console.log(pendingCred);
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
    <HomePageNavigation/>
    <div className="form">
      <div>
        <h1 className="heading">Signup</h1>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter your user name"
          id="name"
          autoComplete="new-user"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="new-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
         style={{
          display:"flex",
          alignItems:"center"}}
         >
        <input
          type={visible ? "text" :"password"}
          placeholder="Enter password"
          id="password"
          autoComplete="new-password"
          required
          value={password}
          style={{width:"30rem",paddingRight: "2rem" }}
          onChange={(e) => setPassword(e.target.value)}
        ></input> 
        <div style={{
          cursor:"pointer",
          position:"absolute",
          marginBottom:"1rem",
          right:"17rem",
         
          }} 
        onClick={()=>setVisible(!visible)}
        >
          {visible ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
        </div>
        </div>
        <button type="submit" onClick={Validation } >Sign up</button>
        <hr />
        <div>
          <button type="submit" onClick={googleHandler}>
            Google
          </button>
        </div>
        <h5>
          Already have an account ?
          <Link to="/login" className="link">
            Login
          </Link>
        </h5>
      </form>
    </div>
    </div>
  );
};

export default Signup;

