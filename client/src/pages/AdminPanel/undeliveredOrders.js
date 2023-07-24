import React from 'react';
import {QUERY_STATUS_FALSE} from '../../utils/queries';
import {useQuery} from '@apollo/client';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
const UndeliveredOrders = () => {
    const { data } = useQuery(QUERY_STATUS_FALSE);
    let orders;
    if(data) {
        orders = data.orderStatusFalse;
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
                <a className='button' href='/adminpanel/delievered' >Delivered</a>
                <a  className='button' href='/adminpanel/undelivered' style={{background: 'var(--hover)'}}>Undelivered</a>
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

export default UndeliveredOrders;



