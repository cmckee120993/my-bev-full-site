import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import Collapsible from 'react-collapsible';

function AdminPanel() {
    const { data } = useQuery(QUERY_ORDERS);


    let orders;
    if(data) {
        orders = data.orders;
    };

    console.log(data);

    const [updateOrderStatus] = useMutation(UPDATE_STATUS);
   

    function orderStatus(order) {
        
        if(order.orderStatus === true) {
            return(
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered!</p>
                        <button className='button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkred', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: In progress!</p>
                        <button className='button' orderId={order._id} onClick={trueStatus}>Change Order Status</button>
                    </div>
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

function singleOrder(event) {
    let orderButton = event.target;
    let orderId = orderButton.getAttribute('orderId');
    document.location.href = `/singleorder/${orderId}`
}


    return(
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

            <h3 className='title'>Delivery Orders</h3>
            <div className='button-div'>
                <a className='button' href='/adminpanel' style={{background: 'var(--hover)'}}>All Orders</a>
                <a className='button' href='/adminpanel/delievered'>Delivered</a>
                <a  className='button' href='/adminpanel/undelivered'>Undelivered</a>
            </div>
    
            
            <div className='admin-orders'>  
                {orders ? (
                    <>
                   
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <h3 className='order-title'><button onClick={singleOrder} orderId={order._id} className='button single-order-button'>Order #{order._id}</button></h3>
                                <ul>
                                    <li key={order.orderOwner}>Order Owner: {order.orderOwner}</li>
                                    <li key={order.purchaseDate}>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    <li key={order.deliveryDate}>Delivery Date: {order.deliveryDate}</li>
                                    <li key={order.address}>Address: {order.address}</li>
                                    <li key={order.phoneNumber}>Phone Number: {order.phoneNumber}</li>
                                    <li key={order.orderType}>Order Type: {order.orderType}</li>
                                    
                                    <li key={order.orderTotal}>Order Total: ${order.orderTotal}</li>
                                    <div className='products-div'>
                                        <Collapsible className='' trigger='Click for the products!' triggerWhenOpen='Close'>
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
                                        </Collapsible>
                                    </div>
                                </ul>
                                {orderStatus(order)}
                            </div> 
                        ))} 
                    </>
                ): null}
            </div>
        </>
    )
}

export default AdminPanel;