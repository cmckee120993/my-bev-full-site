import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';


function AdminPanel() {
    const { data } = useQuery(QUERY_ORDERS);


    let orders;
    if(data) {
        orders = data.orders;
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
                    <li className='delivery-status' style={{background: 'darkred', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Working on it!</li>
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
        <li key={productName}>{productName}</li>
    </>
  )
};

    // function deliveryDateChange(date) {
    //   let delivDate = date.split('-');
    //   let fixedDate = delivDate[1] + '/' + delivDate[2] + '/' + delivDate[0]
    //   return (
    //     <>
    //         <li>Delivery Date: {fixedDate}</li>
    //     </>
    //   )
    // };


    return(
        <>
            <h2 className='admin-title'>Beverage Express Admin Panel</h2>
            <h3 className='all-orders'>Delivery Orders</h3>
            <div className='button-div'>
                <a href='/adminpanel' style={{background: 'var(--hover)'}}>All Orders</a>
                <a href='/adminpanel/delievered'>Delivered</a>
                <a href='/adminpanel/undelivered'>Undelivered</a>
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
}

export default AdminPanel;