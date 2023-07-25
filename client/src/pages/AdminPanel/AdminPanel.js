import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery} from '@apollo/client';
import {QUERY_ORDERS_AND_USER} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';
function AdminPanel() {

const { loading, error, data } = useQuery(QUERY_ORDERS_AND_USER);

    let orders;
    let user;
    if(data) {
        orders = data.orders;
        user = data.user;
    };
    
    if(loading) {
        return (
            <>
            <p>Loading...</p>
            </>
        )
    };
    if(user.admin) {
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
    };
    if (!user.admin) {
        return(
            <h2 className='title'>Sorry not sorry</h2>
        )
    };
    if(error) {
        console.error(error);
        return(
            <h2 className='title'>Wrong page!</h2>
        )
    };
};

export default AdminPanel;