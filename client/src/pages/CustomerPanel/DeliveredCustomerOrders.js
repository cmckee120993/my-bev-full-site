import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_ORDER_TRUE } from  '../../utils/queries';
import '../../styles/CustomerPanel.css'

function DeliveredCustomerOrders() {
    const { data } = useQuery(QUERY_USER_ORDER_TRUE);

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
        
            <div className="orders">
                <div className='order-button-div'>
                    <a href='/customerpanel'>All Orders</a>
                    <a href='/customerpanel/delivered' style={{background: 'var(--hover)'}}>Delivered</a>
                    <a href='/customerpanel/undelivered'>Undelivered</a>
                </div>
                {data ? (
                <>
                    <h2 className="order-history-title">Delivered Orders</h2>
                    {data.trueUserOrders.map((order) => (
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

export default DeliveredCustomerOrders;