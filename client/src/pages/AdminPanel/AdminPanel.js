import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
function AdminPanel() {
    const { data } = useQuery(QUERY_ORDERS);


    let orders;
    if(data) {
        orders = data.orders;
    };

    console.log(data);


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
                            <OrderCard order={order}></OrderCard>
                        ))} 
                    </>
                ): null}
            </div>
        </>
    )
}

export default AdminPanel;