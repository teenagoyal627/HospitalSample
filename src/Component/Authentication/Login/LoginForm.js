import React from "react";
import classes from "./Login.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
const LoginForm = ({
  submitHandler,
  loginFields,
  changeInputHandler,
  visible,
  setVisible,
  Validation,
  googleHandler,
}) => {
  return (
    <div className={classes.form}>
      <div>
        <h1 className={classes.heading}>Login</h1>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Email address"
          id="email"
          required
          value={loginFields.email}
          onChange={changeInputHandler}
          autoComplete="off"
        />
        <div className={classes.passwordContainer}>
          <input
            type={visible ? "text" : "password"}
            placeholder="Enter Password"
            id="password"
            required
            value={loginFields.password}
            onChange={changeInputHandler}
            autoComplete="off"
          />
          <div
            className={classes.passwordToggle}
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
          </a>
        </h5>
      </form>
    </div>
  );
};

export default LoginForm;
