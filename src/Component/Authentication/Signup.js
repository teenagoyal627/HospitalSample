import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import classes from "./Signup.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ShowAndHidePassword from "./ShowAndHidePassword";

function Signup() {
  const history = useHistory();
  //States for signup
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //handle the name change
  const handleName = (event) => {
    setUserName(event.target.value);
    setSubmitted(false);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };
  //for form submission
  const onSubmit = e => {
    e.preventDefault()
    setError('')
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email,password
          )
        .then((res) => {
            console.log(res.user)
          })
        .catch(err => setError(err.message))
    
    if (userName === "" || email === "" || password === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      history.replace("/shop");
    }
    setEmail("");
    setPassword("");
    setUserName("");
  };

  //showing success message
  const successMessage = () => {
    return (
      <div
        className={classes.success}
        style={{ display: submitted ? " " : "none" }}
      >
        <h1> user successfully signup!!</h1>
      </div>
    );
  };
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className={classes.error} style={{ display: error ? "" : "none" }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className={classes.form}>
      <div>
        <h1>Signup</h1>
      </div>
      <div className={classes.message}>
        {errorMessage()}
        {successMessage()}
      </div>
      {/* from for the sign up */}
      <form>
        <label> User Name</label>
        <input
          onChange={handleName}
          placeholder="user name"
          value={userName}
          type="text"
          autoComplete="user-name"
          required
          id="name"
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          required
          id="email"
          value={email}
          autoComplete="new-email"
          onChange={handleEmail}
        />

        <label>Password</label>
       
        <ShowAndHidePassword/>
        <input
          onChange={handlePassword}
          placeholder="password"
          required
          autoComplete="new-password"
          id="password"
          value={password}
          type="password"
          
        />
        <br />
        <br />
        <button onClick={onSubmit} className={classes.btn} type="submit">
          Sign up
        </button>
        <br />
        <hr />
        <div>
          <h5>
            Already have an account
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </h5>
        </div>
      </form>
    </div>
  );
}
export default Signup;
