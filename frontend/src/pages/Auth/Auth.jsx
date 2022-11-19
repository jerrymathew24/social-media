import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {
  return (
    <div className="Auth">
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="WebName">
                <h1>papergrid</h1>
                
            </div>
        </div>
        <Login />
    </div>
    )
}

function Login(){
    return(
        <div className="a-right">
            <form className="infoForm authForm">

                <h3>Login</h3> 
                <div className="">
                    <input type="text" placeholder='User Name' className='infoInput' name='firstName'/>
                </div>
                <div className="">
                    <input type="password" placeholder='Password' className='infoInput' name='firstName'/>
                </div>
                <div className="">
                    <span style={{fontSize:'12px'}}>Don't have an account.  Sign up!</span>
                </div>
                <button className="button infoButton" type='submit'>Login</button>
            </form>
            </div>
    )
}



function SignUp(){
    return(
        <div className="a-right">
            <form className="infoForm authForm">

                <h3>Sign Up</h3>
                <div className="">
                    <input type="text" placeholder='First Name' className='infoInput' name='firstName'/>
                    <input type="text" placeholder='Last Name' className='infoInput' name='lastName'/>
                </div>
                <div className="">
                <input type="text" placeholder='User Name' className='infoInput' name='userName'/>
                </div>
                <div className="">
                    <input type="password" placeholder='Password' className='infoInput' name='password'/>
                    <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass'/>
                </div>
                <div className="">
                    <span style={{fontSize:'12px'}}>Already have an account.  Login!</span>
                </div>
                <button className="button infoButton" type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Auth