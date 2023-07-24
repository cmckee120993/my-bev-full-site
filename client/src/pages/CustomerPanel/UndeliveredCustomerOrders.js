import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_ORDER_FALSE } from  '../../utils/queries';
import '../../styles/CustomerPanel.css';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';

function UndeliveredCustomerOrders() {
    const { data } = useQuery(QUERY_USER_ORDER_FALSE);

    return (
       <>
       <div className="title-div">
                <h2 className="title">Customer Panel
                    <br></br>
                    Uncompleted Orders
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
                    <a className='button' href='/customerpanel/delivered'>Completed</a>
                    <a className='button' href='/customerpanel/undelivered' style={{background: 'var(--hover)'}}>Uncompleted</a>
                </div>
                {data ? (
                <>

                    {data.falseUserOrders.map((order) => (
                        <OrderCard order={order}></OrderCard>
                    ))}
                </>
                ): null}
            </div>
       </>
    )
};

export default UndeliveredCustomerOrders;