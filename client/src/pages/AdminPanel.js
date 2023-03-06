import React from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../utils/mutations';
import '../styles/AdminPanel.css'

function AdminPanel() {
    const { data } = useQuery(QUERY_ORDERS);
    let orders;
    if(data) {
        orders = data.orders;
    };

    const {updateOrderStatus} = useMutation(UPDATE_STATUS);

    console.log(orders);

    function orderStatus(status) {
        if(status === true) {
            return(
                <li className='delivery-status' style={{background: 'green'}}>Delivery Status: Delivered</li>
            )
        } else {
            return (
                <li className='delivery-status' style={{background: 'red'}}>Delivery Status: Working on it!</li>
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
    }

    function changeStatus(order) {
        if (order.orderStatus) {
            updateOrderStatus({
                variables: {
                    orderStatus: false,
                    id
                }
            })
        } else {
            console.log(false);
        }
        
    }

    return(
        <>
            <h2 className='admin-title'>Beverage Express Admin Panel</h2>
            <h3 className='all-orders'>Delivery Orders</h3>
            <div className='admin-orders'>
                {orders ? (
                    <>
                        
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <ul>
                                    <li>Order Owner: {order.orderOwner}</li>
                                    <li>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    {deliveryDateChange(order.deliveryDate)}
                                    {orderStatus(order.orderStatus)}
                                    <button onClick={changeStatus(order)} className='order-change-button'>Change Order Status</button>
                                    <li>Order Total {order.orderTotal}</li>
                                    <li>Products:</li>
                                        {order.products.map(({ name ,price, quantity}, index) => (
                                            <ul>
                                                {titleCase(name)}
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