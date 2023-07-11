import React from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_STATUS_TRUE} from '../../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';
import sixPack from  '../../assets/images/bx-six-pack.webp';

function DeliveredOrders() {
    const { data } = useQuery(QUERY_STATUS_TRUE);
    let orders;
    if(data) {
        orders = data.orderStatusTrue;
    };

    const [updateOrderStatus] = useMutation(UPDATE_STATUS);
   

    function orderStatus(order) {
        
        if(order.orderStatus === true) {
            return(
                <>
                    <li className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered</li>
                    <button className='button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
                </>
            )
        } else {
            return (
                <>
                    <li className='delivery-status' style={{background: 'darkred', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Working on it!</li>
                    <button className='button' orderId={order._id} onClick={trueStatus}>Change Order Status</button>
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


    return (
        <>
            <div className="title-div">
                <h2 className="title">Admin Panel</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>

            <div className='button-div'>
                <a className='button' href='/adminpanel'>All Orders</a>
                <a className='button' href='/adminpanel/delievered' style={{background: 'var(--hover)'}}>Delivered</a>
                <a  className='button' href='/adminpanel/undelivered'>Undelivered</a>
            </div>
            
            <div className='admin-orders'>  
                {orders ? (
                    <>
                   
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <ul>
                                    <li key={order.orderOwner}>Order Owner: {order.orderOwner}</li>
                                    <li key={order.purchaseDate}>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    <li key={order.deliveryDate}>Delivery Date: {order.deliveryDate}</li>
                                    <li key={order.address}>Address: {order.address}</li>
                                    <li key={order.phoneNumber}>Phone Number: {order.phoneNumber}</li>
                                    <li key={order.orderType}>Order Type: {order.orderType}</li>
                                    {orderStatus(order)}
                                    <li key={order.orderTotal}>Order Total: ${order.orderTotal}</li>
                                    <li>Products:</li>
                                        {order.products.map(({ name ,price, quantity}, index) => (
                                            <ul>
                                                {titleCase(name)}
                                                <ul>
                                                    <li key={price}>Price: ${price}</li>
                                                    <li key={quantity}>Quantity: {quantity}</li>
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

export default DeliveredOrders;



