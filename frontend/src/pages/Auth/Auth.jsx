import React from 'react';
import './Auth.css';
import Logo from "../../img/logo.png";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  // use state to reverse the form from login to signup
  const [isSignUp, setIsSignUp] = useState(true);
// use state to capture the data on the form
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });

  // password check
  const [confirmPass, setConfirmPass] = useState(true);


  const handleChange = (e) => {
    //event on form is calling the setData 
    setData({ ...data, [e.target.name]: e.target.value });
  };


// to prevent the default behavior of react -- redirecting to a new page
  const handleSubmit = (e) => {
    e.preventDefault();



    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);

    } else {

      dispatch(logIn(data));
    }
  };


  // reset
  const resetForm = () => {
    setConfirmPass(true);


    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };



  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="WebName">
          <h1>papergrid</h1>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">

        <form className="infoForm authForm" onSubmit={handleSubmit}>
          
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div className="">
            <input
              type="text"
              placeholder="User Name"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
                  {/*  confirm password */}
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>

          <div className="">
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                //using useState on click to reverse the form to login and signup
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up! "}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}  >
            {loading ? "Loading..." : isSignUp ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
