import React from 'react';
import '../App.css';

const PasswordError =({...propsPassword}) => {
   const password = propsPassword.password;
    return (
        <div>
            {(password.isTouched && password.isEmpty) &&
            <div className="error" >
                Field "password" can not be empty
            </div>}
            {(password.isTouched && password.minLengthErr) &&
            <div className="error" >
                Field "password" must have more then 4 symbols
            </div>}
            {(password.isTouched && password.maxLengthErr) &&
            <div className="error" >
                Field "password" must have less then 15 symbols
            </div>}

        </div>
    )
};

export default PasswordError