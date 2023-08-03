import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import '../styles/Login.css';
import sixPack from  '../assets/images/bx-six-pack.webp';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
        {/* page title */}
        <div className="title-div">
                <h2 className="title">Login</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>
        

        <form className="login-form" onSubmit={handleFormSubmit}>
            <div className='login-form-div'>
                <label className="login-label-email" htmlFor="email">Email:</label>
                <input 
                className="input login-input"
                placeholder="youremail@example.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}/>
            </div>
            <div className='login-form-div'>
                <label className="login-label" htmlFor="pwd">Password:</label>
                <input 
                className="input login-input"
                placeholder="*****"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                />
            </div>
            {error ? (
                <div>
                    <p>The provided credentials are incorrect...</p>
                </div>
            ) : null}
            <div className='button-div-login'>
                <button className="button login-submit"type="submit">Submit</button>
            </div>
        </form>
        <div className="signup-link-div">
            <Link className="link" to="/signup"> No account? Signup now!</Link>
        </div>
        </>
    );
};

export default Login;
