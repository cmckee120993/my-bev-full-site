import React from 'react';
import {QUERY_STATUS_FALSE} from '../../utils/queries';
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';

const UndeliveredOrders = () => {
    const { data } = useQuery(QUERY_STATUS_FALSE);
    let orders;
    if(data) {
        orders = data.orderStatusFalse;
    };

    const [updateOrderStatus] = useMutation(UPDATE_STATUS);
   

    function orderStatus(order) {
        
        if(order.orderStatus === true) {
            return(
                <>
                    <li className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered</li>
                    <button className='order-change-button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
                </>
            )
        } else {
            return (
                <>
                    <li className='delivery-status' style={{background: 'darkred', borderRadius: '10px', textAlign: 'center', color: 'white', padding: '5px'}}>Delivery Status: Working on it!</li>
                    <button className='order-change-button' orderId={order._id} onClick={trueStatus}>Change Order Status</button>
                </>
            )
        }
    };
    const trueStatus= (event) => {
        let orderBtn = event.target;
        let orderId = orderBtn.getAttribute('orderid');
       updateOrderStatus ( {
            variables: {
                id: orderId,
                orderStatus: true, 
            }
        })
    };
    const  falseStatus = (event) => {
        let orderBtn = event.target;
        let orderId = orderBtn.getAttribute('orderid');
       updateOrderStatus ( {
            variables: {
                id: orderId,
                orderStatus: false, 
            }
        })
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

    return (
        <>
           <h2 className='admin-title'>Beverage Express Admin Panel</h2>
            <h3 className='all-orders'>Delivery Orders</h3>
            <div className='button-div'>
                <a href='/adminpanel'>All Orders</a>
                <a href='/adminpanel/delievered'>Delivered</a>
                <a href='/adminpanel/undelivered' style={{background: 'var(--hover)'}}>Undelivered</a>
            </div>
            
            <div className='admin-orders'>  
                {orders ? (
                    <>
                   
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <ul>
                                    <li>Order Owner: {order.orderOwner}</li>
                                    <li>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    {deliveryDateChange(order.deliveryDate)}
                                    {orderStatus(order)}
                                    <li>Order Total: ${order.orderTotal}</li>
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
};

export default UndeliveredOrders;



