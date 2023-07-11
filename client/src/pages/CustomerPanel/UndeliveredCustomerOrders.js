import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_ORDER_FALSE } from  '../../utils/queries';
import '../../styles/CustomerPanel.css';
import sixPack from  '../../assets/images/bx-six-pack.webp';

function UndeliveredCustomerOrders() {
    const { data } = useQuery(QUERY_USER_ORDER_FALSE);

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

    return (
       <>
       <div className="title-div">
                <h2 className="title">Customer Panel</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>
        <div className="orders">
                <div className='order-button-div'>
                    <a className='button' href='/customerpanel' >All Orders</a>
                    <a className='button' href='/customerpanel/delivered'>Delivered</a>
                    <a className='button' href='/customerpanel/undelivered' style={{background: 'var(--hover)'}}>Undelivered</a>
                </div>
                {data ? (
                <>

                    {data.falseUserOrders.map((order) => (
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

export default UndeliveredCustomerOrders;