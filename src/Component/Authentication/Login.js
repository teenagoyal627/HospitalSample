import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link } from "@mui/material";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase";
import HomePageNavigation from "../Header/HomePageNavigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const Validation = () => {
    const regExEmail =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const regExPass =
      "^(?=.*[0-9])" +
      "(?=.*[a-z])(?=.*[A-Z])" +
      "(?=.*[@#$%^&+=])" +
      "(?=\\S+$).{8,20}$";
    if (regExEmail.test(email) && regExPass.match(password)) {
      console.log("valid email");
    } else if (
      !regExEmail.test(email) &&
      email === "" &&
      !regExPass.match(password) &&
      password === ""
    ) {
      alert("Check Email and enter strong password");
      history.replace("/login");
    } else {
      alert("successfully Login");
    }
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user.uid;
          console.log(user);
          alert("Successfully Login");
          history.replace("/shop");
          setEmail("");
          setPassword("");
        })
        .catch(() => {
          alert("Enter correct email or password for login  ");
        });
    } catch (error) {
      alert("Please signup before login");
    }
  };
  const googleHandler = () => {
    const provider = new GoogleAuthProvider();
    // console.log(provider)
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
        alert("Successfully Login");
        history.replace("/shop");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.code);
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(credential);
      });
  };
  return (
    <div>
      <HomePageNavigation />
      <div className={classes.form}>
        <div>
          <h1 className="heading">Login</h1>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Email address"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <div className="password-container">
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <div className="password-toggle"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
          <button type="submit" onClick={() => Validation}>
            Login
          </button>
          <hr />
          <button type="submit" onClick={googleHandler}>
            Google
          </button>
          <h5>
          New account ?
          <a href="/signup" className={classes.links}>
            Signup
            {console.log("signup button is clicked ")}
          </a>
        </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
