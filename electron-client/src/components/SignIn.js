import React, { useState } from 'react'
import * as cognito from '../utils/cognitoOperations'
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import {actionCreators as UserActionCreators } from '../store/userReducer';

const SignIn = () => {
    const dispatch = useDispatch()
    const [username, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('');

    const submitUser = async e => {
        e.preventDefault()
        const res = await cognito.signInWithEmail(username, userPassword)
        dispatch(UserActionCreators.login(res.accessToken))
    }

    return (
        <div className="signForm-wrapper">
            <form className="signForm" onSubmit={submitUser}>
                <label >userName </label>
                <input id="inName" name="inName" value={username} onChange={e => setUserName(e.target.value)} />
                <br />
                <label>password</label>
                <input id="inName" name="inName" value={userPassword} onChange={e =>setUserPassword(e.target.value)} />
                <br />
                <Button color="secondary" variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignIn