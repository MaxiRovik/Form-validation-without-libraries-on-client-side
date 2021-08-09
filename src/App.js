import React from 'react';
import './App.css';
import {useState, useEffect} from "react";

const App = () => {

  return (
    <div className="App">
      <form className="form">
        <h1 className="title">Registration</h1>

        <div className="field">
             <label for="email">Your email</label>
            <input
                   name="email" type="text"
                   placeholder="Email" className="input"/>
        </div>

        <div className="field">


            <label for="password">Enter your password</label>
            <input
                   name ="password" type="password"
                   placeholder="password" className="input"/>
        </div>
        <button  type = "submit" className="btn">Confirm</button>
      </form>
    </div>
  );
};

export default App;
