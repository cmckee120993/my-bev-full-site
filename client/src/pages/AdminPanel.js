import React from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../utils/queries';
import '../styles/AdminPanel.css'

function AdminPanel() {
    const { data } = useQuery(QUERY_ORDERS);
    let orders;
    if(data) {
        orders = data.orders;
    };

    console.log(orders);

    function orderStatus(status) {
        if(status === true) {
            return(
                <li style={{background: 'green'}}>Delivery Status: Delivered</li>
            )
        } else {
            return (
                <li style={{background: 'red'}}>Delivery Status: Working on it!</li>
            )
        }
    };

    function deliveryDateChange(date) {
      let delivDate = date.split('-');
      let fixedDate = delivDate[1] + '/' + delivDate[2] + '/' + delivDate[0]
      return (
        <>
            <li>Delivery Date: {fixedDate}</li>
        </>
      )
    }

    return(
        <>
            <h2 className='admin-title'>Beverage Express Admin Panel</h2>
            <div className='admin-orders'>
                {orders ? (
                    <>
                        <h2 className='all-orders'>Orders</h2>
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <ul>
                                    <li>Order Owner: {order.orderOwner}</li>
                                    <li>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    {deliveryDateChange(order.deliveryDate)}
                                    {orderStatus(order.orderStatus)}
                                    <button>Change Order Status</button>
                                    <li>Order Total {order.orderTotal}</li>
                                    <li>Products:</li>
                                        {order.products.map(({name, price, quantity}, index) => (
                                            <ul>
                                                <li>{name}</li>
                                                <ul>
                                                    <li>Price: ${price}</li>
                                                    <li>Quantity: {quantity}</li>
                                                </ul>
                                            </ul>
                                        ))}
                                </ul>
                            </div> 
                            
                        ))}
                       
                    </>
                ): null}
            </div>
        </>
    )
}

export default AdminPanel;