import React from 'react'
import './App.css';
import {useState, useEffect} from "react";

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const[emailTouch, setEmailTouch] = useState(false);
  const[passwordTouch, setPasswordTouch] = useState(false);

  const[emailError, setEmailError]=useState('field can not be empty')
  const[passwordError, setPasswordError]=useState('field can not be empty')
  const [formValid, setFormValid] = useState(false);

  useEffect(()=>{
    if( emailError || passwordError){
        setFormValid(false)
    } else {
      setFormValid(true)
    }
},[emailError, passwordError])

  const blurHandler = (e) => {
    switch(e.target.name){
        case 'email':
            setEmailTouch(true);
            break;
        case 'password':
          setPasswordTouch(true);
            break
    }
};
  const emailHandler = (e)=> {
      setEmail(e.target.value)
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase())) {
          setEmailError('incorrect email')

      } else {
          setEmailError('')
      };
  };

    const passwordHandler = (e)=> {
        setPassword(e.target.value)
        if(e.target.value.length <3 || e.target.value.length>10){
            setPasswordError('password must be from 3 to 20 symbols')
            if(!e.target.value) {
                setPasswordError(' field can not be empty')
            }
        }
        else{
            setPasswordError('')
        }
    };

  return (
    <div className="App">
      <form className="form">
        <h1 className="title">Registration</h1>

        <div className="field">
            {(emailTouch && emailError ) &&
             <div style={{color:'red'}}>
               {emailError}
             </div>}
             <label for="email">Your email</label>
            <input value ={email} onChange = {(e) => emailHandler(e)}
                   onBlur={e=>blurHandler(e)}
                   name="email" type="text"
                   placeholder="Email" className="input"/>
        </div>
        <div className="field">
            {(passwordTouch && passwordError ) &&
            <div style={{color:'red'}}>
                {passwordError}
            </div>}
            <label for="password">Enter your password</label>
            <input value = {password} onChange = {(e) => passwordHandler(e)}
                   onBlur={e=>blurHandler(e)}
                   name ="password" type="password"
                   placeholder="password" className="input"/>
        </div>
        <button disabled ={!formValid} type = "submit" className="btn">Confirm</button>
      </form>
    </div>
  );
};

export default App;
