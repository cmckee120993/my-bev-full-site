import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDER_AND_USER} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
function SingleOrder() {

    // Needs updated when site is live
    let orderId = window.location.href.slice(34);
    let order;
    let user;
    const {loading, error, data} = useQuery(QUERY_ORDER_AND_USER, {
        variables: { id: `${orderId}`},
    } );

if(data) {
    order = data.order;
    user = data.user;
}
    
if (loading) {
    return(
        <>
        <p>LOADING...</p>
        </>
    )
};
    if(user.admin) {
        return (
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
            <div className='single-order-div'>
                <OrderCard order={order}></OrderCard>
            </div>
            </>
        )
    };
    if (!user.admin) {
        <h2 className='title'>Sorry not sorry...</h2>
    };
    if (error) {
        console.error(error);
        <h2 className='title'>Something went wrong...</h2>
    }
}

export default SingleOrder;