import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, SignInUserWithEmailAndPassword } from './loginManager';

const Login = () =>
{
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const GoogleSignIn = () =>
    {
        handleGoogleSignIn()
            .then(res =>
            {
                handleResponse(res, true);
            })
    }

    const GoogleLogOut = () =>
    {
        handleSignOut()
            .then(res =>
            {
                handleResponse(res, false);
            })
    }

    const FbSignIn = () =>
    {
        handleFbSignIn()
            .then(res =>
            {
                handleResponse(res, true);
            })
    }

    const handleResponse = (res, redirect) =>
    {
        setUser(res)
        setLoggedInUser(res)
        if (redirect)
        {
            history.replace(from);
        }
    }

    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleSubmit = (event) =>
    {
        if (newUser && user.email && user.password)
        {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res =>
                {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password)
        {
            SignInUserWithEmailAndPassword(user.email, user.password)
                .then(res =>
                {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }

    const handleBlur = (event) =>
    {
        let isFormValid;

        if (event.target.name === 'name')
        {
            isFormValid = event.target.value.length > 4;
        }

        if (event.target.name === 'email')
        {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }

        if (event.target.name === 'password')
        {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && isPasswordHasNumber;
        }

        if (isFormValid)
        {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ?
                    <button onClick={GoogleLogOut}>Log out</button> :
                    <button onClick={GoogleSignIn}>Google Sign in</button>
            }
            <br /><br />
            <button onClick={FbSignIn}>Facebook Sign in</button>
            {
                user.isSignedIn && <div>
                    <h3>Welcome, {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
            <label htmlFor="newUser">Sign Up</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="User Name" required />
                }
                <br /><br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required />
                <br /><br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                <br /><br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }
        </div>
    );
};

export default Login;