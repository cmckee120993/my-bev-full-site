import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDER} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
function SingleOrder() {

    // Needs updated when site is live
    let orderId = window.location.href.slice(34);
    console.log(orderId);
    let order;
    const {data} = useQuery(QUERY_ORDER, {
        variables: { id: `${orderId}`},
    } );
    
    function initOrder() {
    if(data) {
        order = data.order;
        return (
            <>
                <OrderCard order={order}></OrderCard>
            </>
        )
    } else {
        return(
            <>
            <p>LOADING...</p>
            </>
        )
    }
    }
   


    return(
        <>
           <div className="title-div">
                <h2 className="title">Order #{orderId}</h2>
                <img
                loading='lazy'
                className="title-image"
                src={sixPack}
                alt="Beverage Express Six Pack Logo"
                />
            </div>
            
            {initOrder()}
        </>
    )
}

export default SingleOrder;