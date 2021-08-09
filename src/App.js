import React from 'react';
import './App.css';
import {useState, useEffect} from "react";

const useValidation = (value, validations) => {
    const [isEmpty,setEmpty] = useState(true);
    const [minLengthErr,setMinLengthErr] = useState(false);
    const [maxLengthErr, setMaxLengthErr] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false)

    useEffect(() =>{
        for (const validation in validations ) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthErr(true)
                        :setMinLengthErr(false);
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthErr(true)
                        :setMaxLengthErr(false);
                    break;
                case 'isEmpty':
                    value ? setEmpty(false): setEmpty(true);
                    break;
                case 'isValidEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
            }
        }
    }, [value]);

    useEffect(()=>{
        if(isEmpty || maxLengthErr || minLengthErr ||emailError){
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthErr,minLengthErr,emailError ])

    return {
        isEmpty,
        minLengthErr,
        maxLengthErr,
        emailError,
        inputValid
    }

};


const  useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isTouched, setTouched] = useState(false);
    const valid = useValidation(value,validations);

    const onChange = (e) => {
        setValue(e.target.value)

    };
    const onBlur = (e) => {
        setTouched(true)
    };
    return {
        value,
        onChange,
        onBlur,
        isTouched,
       ...valid
    }
};


const App = () => {
    const email = useInput('', {isEmpty: true, minLength:4, maxLength:20, isValidEmail:''});
    const password = useInput('', {isEmpty: true, minLength:5, maxLength:15});

  return (
    <div className="App">
      <form className="form">
        <h1 className="title">Registration</h1>

        <div className="field">
             <label for="email">Your email</label>
                {(email.isTouched && email.isEmpty) &&
                    <div style={{color:"red", fontSize: "14px"}} >
                              Field "email" can not be empty
                    </div>}
                {(email.isTouched && email.minLengthErr) &&
                    <div style={{color:"red", fontSize: "14px"}} >
                                 Field "email" must have more then 4 symbols
                    </div>}
                {(email.isTouched && email.maxLengthErr) &&
                    <div style={{color:"red", fontSize: "14px"}} >
                        Field "email" must have less then 20 symbols
                    </div>}
                {(email.isTouched && email.emailError) &&
                    <div style={{color:"red",fontSize: "14px"}} >
                        incorrect email
                    </div>}
            <input onChange={(e)=>email.onChange(e)} onBlur={(e)=>email.onBlur(e)}
                   value={email.value}
                   name="email" type="text"
                   placeholder="Email" className="input"/>
        </div>

        <div className="field">
            <label for="password">Enter your password</label>
                {(password.isTouched && password.isEmpty) &&
                <div style={{color:"red", fontSize: "14px"}} >
                    Field "password" can not be empty
                </div>}
                {(password.isTouched && password.minLengthErr) &&
                <div style={{color:"red", fontSize: "14px"}} >
                    Field "password" must have more then 4 symbols
                </div>}
                {(password.isTouched && password.maxLengthErr) &&
                <div style={{color:"red", fontSize: "14px"}} >
                    Field "password" must have less then 15 symbols
                </div>}

            <input onChange={(e)=>password.onChange(e)} onBlur={(e)=>password.onBlur(e)}
                   value={password.value}
                   name ="password" type="password"
                   placeholder="password" className="input"/>
        </div>
        <button disabled ={!email.inputValid || !password.inputValid} type = "submit" className="btn">Confirm</button>
      </form>
    </div>
  );
};

export default App;
