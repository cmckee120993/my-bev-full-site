import React from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_STATUS_TRUE} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
function DeliveredOrders() {
    const { data } = useQuery(QUERY_STATUS_TRUE);
    let orders;
    if(data) {
        orders = data.orderStatusTrue;
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
                            <OrderCard order={order}></OrderCard>
                        ))} 
                    </>
                ): null}
            </div>
        </>
    )
};

export default DeliveredOrders;



