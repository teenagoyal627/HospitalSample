import React, {  useState } from "react";
import "./Signup.css";
import { auth, db } from "../../../Firebase";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import HomePageNavigation from "../../Header/HomePageNavigation";
import { changeInputHandler } from "../Login/Utilities";

const Signup = (shopId) => {
  const history = useHistory();
  const[signupFields,setSignupFields]=useState({
    fullName:"",
    email:"",
    password:""
  })
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [visible,setVisible]=useState(false);
  

  
  const Validation =()=>{
    const regExEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const regExPass = "^(?=.*[0-9])"
    + "(?=.*[a-z])(?=.*[A-Z])"
    + "(?=.*[@#$%^&+=])"
    + "(?=\\S+$).{8,20}$";  
    const regExUser=  "^[A-Za-z][A-Za-z0-9_]{4,29}$";
     if(regExEmail.test(signupFields.email) && regExPass.match(signupFields.password) && regExUser.match(signupFields.fullName)){
        console.log("valid email")
      }else if(!regExEmail.test(signupFields.email) && signupFields.email===""  &&  !regExPass.match(signupFields.password) && signupFields.password==="" && !regExPass.match(signupFields.fullName) && signupFields.fullName===""){
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
        signupFields.email,
        signupFields.password
      );
      // console.log(userCrediential)
      //console.log(typeof(userCrediential))
      const userId = userCrediential.user.uid;
      //check user id is present or not
      if (userId != null) 
      console.log("the user id is   ",userId);
      // const userRef = doc(db, "users", userId);
      // const userSnap = await getDoc(userRef);
      // if (userSnap.exists()) {
      //   alert("email already exists ");
      // }
      history.replace("/userDetails");

      const dateAndTime = new Date();
      await setDoc(doc(db, "users", userId), {
        FullName: signupFields.fullName,
        Email: signupFields.email,
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
      setSignupFields({
        fullName:"",
        email:"",
        password:""
      })
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
   
    </div>
  );
};

export default Signup;

