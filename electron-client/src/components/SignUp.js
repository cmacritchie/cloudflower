import React, { useState } from 'react'
import * as cognito from '../utils/cognitoOperations'
import Button from '@material-ui/core/Button';

const SignUp = () => {

    const [username, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitUser = async e => {
        e.preventDefault()
        await cognito.signUpUserWithEmail(username, userEmail, userPassword)
    }

    return (
        <div className="signForm-wrapper">
            <form className="signForm" onSubmit={submitUser}>
                <label >userName </label>
                <input id="signName" name="signName" value={username} onChange={e => setUserName(e.target.value)} />
                <br />
                <label >email address</label>
                <input id="signaddress" name="signaddress" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                <br />
                <label>password</label>
                <input id="signPass" name="signpass" value={userPassword} onChange={e =>setUserPassword(e.target.value)} />
                <br />
                <Button color="primary" variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUp