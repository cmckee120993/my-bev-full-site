import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../../utils/queries';
import {useMutation} from '@apollo/client';
import {UPDATE_STATUS} from '../../utils/mutations';
import sixPack from  '../../assets/images/bx-six-pack.webp';

function SingleOrder() {
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
    let orderId = orderButton.getAttribute('postId');
    document.location.href = `/post/${orderId}`
}


    return(
        <>
            <h2>Hello!</h2>
        </>
    )
}

export default SingleOrder;