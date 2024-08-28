import React from 'react'
import './Signup.css'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const SignupForm = ({signupSubmitHandler,signupFields,signupChangeInputHandler,visible,setVisible,signupValidation,signupGoogleHandler}) => {
  return (
    <div className="form">
      <div>
        <h1 className="heading">Signup</h1>
      </div>
      <form onSubmit={signupSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your Full name"
          id="fullName"
          autoComplete="new-user"
          required
          value={signupFields.fullName}
          onChange={signupChangeInputHandler}
        />
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="new-email"
          required
          value={signupFields.email}
          onChange={signupChangeInputHandler}
        />
        <div className="password-container">
        <input
          type={visible ? "text" :"password"}
          placeholder="Enter password"
          id="password"
          autoComplete="new-password"
          required
          value={signupFields.password}
          onChange={signupChangeInputHandler}
        />
        <div 
        className="password-toggle"
        onClick={()=>setVisible(!visible)}
        >
          {visible ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
        </div>
        </div>
        <button type="submit" onClick={signupValidation } >Sign up</button>
        <hr />
        <div>
          <button type="submit" onClick={signupGoogleHandler}>
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
  )
}

export default SignupForm
