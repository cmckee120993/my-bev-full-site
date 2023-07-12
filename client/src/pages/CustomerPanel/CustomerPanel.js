import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from  '../../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import '../../styles/CustomerPanel.css'
import sixPack from  '../../assets/images/bx-six-pack.webp';

function CustomerPanel() {
    const { data } = useQuery(QUERY_USER);
    let user;
    if (data) {
        user = data.user;
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

    function orderStatus(status) {
        if(status === true) {
            return(
                <li style={{background: 'darkGreen', borderRadius: '10px'}}>Status: Delivered</li>
            )
        } else {
            return (
                <li style={{background: 'darkRed', borderRadius: '10px'}}>Status: Working on it!</li>
            )
        }
    };

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  let productName= str.join(' ');
  
  return (
    <>
        <li key={productName}>{productName}</li>
    </>
  )
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
            <div className="orders">
                <div className='order-button-div'>
                    <a className='button' href='/customerpanel' style={{background: 'var(--hover)'}}>All Orders</a>
                    <a className='button' href='/customerpanel/delivered'>Completed</a>
                    <a className='button' href='/customerpanel/undelivered'>Uncompleted</a>
                </div>
                {user ? (
                <>
                    <h3 className="title"> Order History for {user.firstName} {user.lastName}</h3>
                    <h3 className='order-history-email'>{user.email}</h3>
                    {user.orders.map((order) => (
                        <div className='order-history-div'>
                            <h3 className='order-date'> Order Placed On:&nbsp;
                            {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </h3>

                            <div className='order-details'>
                                <ul>
                                    <li key={order.orderOwner}>Person Picking Up Order: {order.orderOwner}</li>
                                    <li key={order.deliveryDate}>Delivery Date: {order.deliveryDate}</li>
                                    <li key={order.address}>Address: {order.address}</li>
                                    <li key={order.phoneNumber}>Phone Number: {order.phoneNumber}</li>
                                    <li key={order.orderType}>Order Type: {order.orderType}</li>
                                    {orderStatus(order.orderStatus)}
                                    
                                    <li>Products:</li>
                                    {order.products.map(({name, price, quantity}, index) => (
                                    <ul>
                                        {titleCase(name)}
                                        <ul>
                                        <li key={price}>Price for One: {price}</li>
                                        <li key={quantity}>Quantity: {quantity}</li>
                                        </ul>
                                    </ul>
                                    ))}
                                    <li>Total: ${order.orderTotal}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </>
                ): null}
            </div>
       </>
    )
};

export default CustomerPanel;