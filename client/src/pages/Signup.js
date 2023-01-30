import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../styles/Signup.css';

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
        <h2 className="signup-title">Signup</h2>
        
        <form className='signup-form' onSubmit={handleFormSubmit}>
            <div>
                <label className='signup-label' htmlFor="firstName">First Name:</label>
                <input
                    className='signup-input'
                    placeholder="First"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange}
                    />
            </div>
            <div>
                <label className='signup-label' htmlFor="lastName">Last Name:</label>
                <input
                    className='signup-input'
                    placeholder="Last"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className='signup-label-email' htmlFor="email">Email:</label>
                <input 
                    className='signup-input'
                    placeholder="youremail@example.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                    />
            </div>
            <div>
                <label className='signup-label-password' htmlFor="pwd">Password:</label>
                <input 
                    className='signup-input'
                    placeholder="*****"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                    />
            </div>
            <div>
                <button className='signup-button' type="submit">Submit</button>
            </div>
        <div className="login-link-div">
            <Link className='login-link' to="/login">Already have an account? Login</Link>
        </div>

        </form>
        </>
    );
};

export default Signup;