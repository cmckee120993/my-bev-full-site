import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from  '../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import '../styles/CustomerPanel.css'

function CustomerPanel() {
    const { data } = useQuery(QUERY_USER);
    let user;
    if (data) {
        user = data.user;
    };
    console.log(data);
    const [formState, setFormState] = useState({email: '', firstName: '', lastName: ''})
    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await updateUser ({
            variables: {
                email: formState.email,
                firstName: formState.firstName,
                lastName: formState.lastName,
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

    return (
       <>
        <h2 className='update-title'>Update User Info</h2>
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
                    <button className='update-button' type="submit">Update</button>
                </div>
            </div>
        </form>
            <div className="orders">
                {user ? (
                <>
                    <h2 className="order-history-title"> Order History for {user.firstName} {user.lastName}</h2>
                    {user.orders.map((order) => (
                        <div className='order-history-div'>
                            <h3 className='order-date'>
                            {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </h3>

                            <div className='order-details'>
                                <ul>
                                    <li>Person Picking Up Order: {order.orderOwner}</li>
                                    <li>Delivery Date: {order.deliveryDate}</li>
                                    <li>Total: ${order.orderTotal}</li>
                                    <li>Products:</li>
                                    {order.products.map(({name, price, quantity}, index) => (
                                    <ul>
                                        <li>{name}</li>
                                        <ul>
                                        <li>Price for One: {price}</li>
                                        <li>Quantity: {quantity}</li>
                                        </ul>
                                    </ul>
                                    ))}
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