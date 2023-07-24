import React from 'react';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';
import Collapsible from 'react-collapsible';
import './style.css';

const OrderCard = ({ order }) => {


    const [updateOrderStatus] = useMutation(UPDATE_STATUS);
   

    function orderStatus(order) {
        
        let customerAdmin = window.location.href.split("/");
        console.log(customerAdmin);
        if(order.orderStatus === true && customerAdmin[3] === 'customerpanel') {
            return(
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered!</p>
                    </div>
                </>
            )
        } else if (order.orderStatus === false && customerAdmin[3] === 'customerpanel') {
            return (
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkred', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: In progress!</p>
                    </div>
                </>
            )
        } else if(order.orderStatus === true && customerAdmin[3] === 'adminpanel') {
            return(
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered!</p>
                        <button className='button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
                    </div>
                </>
            )
        } else if (order.orderStatus === true && customerAdmin[3] === 'singleorder') {
            return (
                <>
                <div className='status-div'>
                    <p className='delivery-status' style={{background: 'darkgreen', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: Delivered!</p>
                    <button className='button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
                </div>
            </>
            )
        } else if (order.orderStatus === false && customerAdmin[3] === 'adminpanel') {
            return (
                <>
                    <div className='status-div'>
                        <p className='delivery-status' style={{background: 'darkred', textAlign: 'center', borderRadius: '10px', color: 'white', padding: '5px'}}>Delivery Status: In progress!</p>
                        <button className='button' orderId={order._id} onClick={trueStatus}>Change Order Status</button>
                    </div>
                </>
            )
        } else if (order.orderStatus === false && customerAdmin[3] === 'singleorder') {
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

function orderTitle() {
    let customerAdmin = window.location.href.split('/');
    console.log(customerAdmin)
    if (customerAdmin[3] === 'customerpanel') {
        return (
            <>
            <h3 className='title order-title'>Order # {order._id}</h3>
            </>
        )
    } else {
        return (
            <>
            <h3 className='title'><button onClick={singleOrder} orderId={order._id} className='button single-order-button'>Order #{order._id}</button></h3>
            </>
        )
    }
}
    return(
        <> 
                <div className='order-div'>
                    {orderTitle()}
                    <ul>
                        <li key={order.orderOwner}>Order Owner: {order.orderOwner}</li>
                        <li key={order.purchaseDate}>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                        <li key={order.deliveryDate}>Delivery Date: {order.deliveryDate}</li>
                        <li key={order.address}>Address: {order.address}</li>
                        <li key={order.phoneNumber}>Phone Number: {order.phoneNumber}</li>
                        <li key={order.orderType}>Order Type: {order.orderType}</li>
                        {orderStatus(order)}
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
                </div> 
        </>
    );

};

export default OrderCard;