import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from  '../../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import '../../styles/CustomerPanel.css'

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
        <li>{productName}</li>
    </>
  )
};

 function deliveryDateChange(date) {
      let delivDate = date.split('-');
      let fixedDate = delivDate[1] + '/' + delivDate[2] + '/' + delivDate[0]
      return (
        <>
            <li>Delivery Date: {fixedDate}</li>
        </>
      )
    };

    return (
       <>
        <h2 className='update-title'>Customer Panel Home</h2>
        <h3 className='update-title'>Update Information</h3>
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
                    <button className='update-button' onClick={resetForm} type="submit">Update</button>
                </div>
            </div>
        </form>
            <div className="orders">
                <div className='order-button-div'>
                    <a href='/customerpanel' style={{background: 'var(--hover)'}}>All Orders</a>
                    <a href='/customerpanel/delivered'>Delivered</a>
                    <a href='/customerpanel/undelivered'>Undelivered</a>
                </div>
                {user ? (
                <>
                    <h3 className="order-history-title"> Order History for {user.firstName} {user.lastName}</h3>
                    <h3 className='order-history-email'>{user.email}</h3>
                    {user.orders.map((order) => (
                        <div className='order-history-div'>
                            <h3 className='order-date'> Order Placed On:&nbsp;
                            {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </h3>

                            <div className='order-details'>
                                <ul>
                                    <li>Person Picking Up Order: {order.orderOwner}</li>
                                    <li>Delivery Date: {deliveryDateChange(order.deliveryDate)}</li>
                                    {orderStatus(order.orderStatus)}
                                    
                                    <li>Products:</li>
                                    {order.products.map(({name, price, quantity}, index) => (
                                    <ul>
                                        <li>{titleCase(name)}</li>
                                        <ul>
                                        <li>Price for One: {price}</li>
                                        <li>Quantity: {quantity}</li>
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