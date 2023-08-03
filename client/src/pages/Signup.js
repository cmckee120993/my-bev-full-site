import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../styles/AccountForm.css';

import sixPack from  '../assets/images/bx-six-pack.webp';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser ({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
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
                <h2 className="title">Signup</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>
        <form className='account-form' onSubmit={handleFormSubmit}>
            <div className='account-form-div'>
                <label className='account-label' htmlFor="firstName">First Name:</label>
                <input
                    className='input account-input'
                    placeholder="First"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange}
                    />
            </div>
            <div className='account-form-div'>
                <label className='account-label' htmlFor="lastName">Last Name:</label>
                <input
                    className='input account-input'
                    placeholder="Last"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    onChange={handleChange}
                />
            </div>
            <div className='account-form-div'>
                <label className='account-label-email' htmlFor="email">Email:</label>
                <input 
                    className='input account-input'
                    placeholder="youremail@example.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                    />
            </div>
            <div className='account-form-div'>
                <label className='account-label-password' htmlFor="pwd">Password:</label>
                <input 
                    className='input account-input'
                    placeholder="*****"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                    />
            </div>
            <div className='button-div-account'>
                <button className='button account-submit' type="submit">Submit</button>
            </div>
        <div className="account-link-div">
            <Link className='link account-link' to="/login">Already have an account? Login</Link>
        </div>

        </form>
        </>
    );
};

export default Signup;