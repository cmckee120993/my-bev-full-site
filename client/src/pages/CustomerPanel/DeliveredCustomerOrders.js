import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_ORDER_TRUE } from  '../../utils/queries';
import '../../styles/CustomerPanel.css';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard'

function DeliveredCustomerOrders() {
    const { data } = useQuery(QUERY_USER_ORDER_TRUE);

    return (
       <>
       <div className="title-div">
                <h2 className="title">Customer Panel
                    <br></br>
                    Completed Orders
                </h2>
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
                    <a className='button' href='/customerpanel/delivered' style={{background: 'var(--hover)'}}>Completed</a>
                    <a className='button' href='/customerpanel/undelivered'>Uncompleted</a>
                </div>
                {data ? (
                <>
                    {data.trueUserOrders.map((order) => (
                       <OrderCard order={order}></OrderCard>
                    ))}
                </>
                ): null}
            </div>
       </>
    )
};

export default DeliveredCustomerOrders;