import React from 'react';
import '../App.css';

const MailError =({...propsEmail}) => {
    const email = propsEmail.email
    console.log(email);
    return (
        <div>
        {(email.isTouched && email.isEmpty) &&
        <div className="error" >
        Field "email" can not be empty
        </div>}
        {(email.isTouched && email.minLengthErr) &&
        <div className="error" >
        Field "email" must have more then 4 symbols
        </div>}
        {(email.isTouched && email.maxLengthErr) &&
        <div className="error" >
        Field "email" must have less then 20 symbols
        </div>}
        {(email.isTouched && email.emailError) &&
        <div className="error" >
        incorrect email
        </div>}
    </div>
    )
};

export default MailError