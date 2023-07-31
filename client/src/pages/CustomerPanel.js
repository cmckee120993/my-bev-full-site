import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_USER, QUERY_USER_ORDER_STATUS } from  '../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import '../styles/CustomerPanel.css'
import sixPack from  '../assets/images/bx-six-pack.webp';
import OrderCard from '../components/OrderCard';

function CustomerPanel() {
    const { loading: userLoading, data: userData, error } = useQuery(QUERY_USER);
    const [userOrderStatus, { data: userOrderData, loading: userOrderLoading, error: userOrderError}] = useLazyQuery(QUERY_USER_ORDER_STATUS);
    let orderSearch;
    let user;
    
    if (userData) {
        user = userData.user;
    };

    if (userOrderData) {
        orderSearch = userOrderData.userOrderSearch;
    }

    const buttonSearch = (event) => {
        let catButton = event.target;
        let category = catButton.getAttribute('id');
        buttons(category);
    };

    function buttons(str) {
        if (str === 'undelivered') {
        userOrderStatus({variables: {orderStatus: false}});
    } else if (str === 'delivered') {
        userOrderStatus({variables: {orderStatus: true}})
    }
    else if (str === 'all-orders') {
        window.location.reload();
    }
 };

    function initOrderData() {
        if(userLoading || userOrderLoading) {
            return (
                <>
                    <p>Loading...</p>
                </>
            )
        } if (orderSearch) {
            return (
                <>
                <div className='admin-orders'>  
        {orderSearch ? (
            <>   
                {orderSearch.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        } 
        if (!orderSearch) {
           
            return (
                <>
                <div className='admin-orders'>  
        {user ? (
            <>   
                {user.orders.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        };

        if (error || userOrderError) {
            return(
            <>
                <p>Return home...</p>
            </>
            )
        }
    };
   
    const [formState, setFormState] = useState({email: '', firstName: '', lastName: ''})
    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        let email;
        let firstName;
        let lastName;

        event.preventDefault();
        if (formState.email === '') {
            email = user.email
        } else {
            email = formState.email
        }
        if (formState.firstName === '') {
            firstName = user.firstName
        } else {
            firstName = formState.firstName
        }
        if (formState.lastName === '') {
            lastName = user.lastName
        } else {
            lastName = formState.lastName
        }
         await updateUser ({
            variables: {
                email: email,
                firstName: firstName,
                lastName: lastName,
            },
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    };

    function resetForm() {
        let emailValue = document.getElementById('email');
        let firstNameValue = document.getElementById('firstName');
        let lastNameValue = document.getElementById('lastName');
        emailValue.value = '';
        firstNameValue.value = '';
        lastNameValue.value = '';
    };

    

    return (
       <>

            <div className="title-div">
                <h2 className="title">Customer Panel
                  <br></br> 
                  Main Page     
                </h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>
        
        <h3 className='title'>Update Information</h3>
        <form className='update-form' onSubmit={handleFormSubmit}>
            <div className='update-form-div'>
                <div>
                    <label className="update-label" htmlFor="firstName">First Name:</label>
                    <input
                        className="update-input"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="update-label" htmlFor="lastName">Last Name:</label>
                    <input
                        className="update-input"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="update-label-email" htmlFor="email">Email:</label>
                    <input 
                        className="update-input"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className='update-button-div'>
                    <button className='button' onClick={resetForm} type="submit">Update</button>
                </div>
            </div>
        </form>

        {user ? (
                <>
                    <h3 className="title"> Order History for {user.firstName} {user.lastName}</h3>
                    <h3 className='order-history-email'>{user.email}</h3>
                </>
                ): null}

                
            <div className='checkbox-div'>
                <button className='button cat-button' id='delivered' name='status' value='delivered' onClick={buttonSearch}>Delivered Orders</button>
                <button className='button cat-button' id='undelivered' name='status' value='undelivered' onClick={buttonSearch}>Undelivered Orders</button>
                <button className='button cat-button' id='all-orders' name='status' value='all-orders' onClick={buttonSearch}>All Orders</button>
            </div>

            

        {initOrderData()}
       </>
    )
};

export default CustomerPanel;