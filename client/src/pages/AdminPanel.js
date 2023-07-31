import React from 'react';
import '../styles/AdminPanel.css';
import {useQuery, useLazyQuery} from '@apollo/client';
import {QUERY_ORDERS_AND_USER, QUERY_SEARCH_PARAMS} from '../utils/queries';
import sixPack from  '../assets/images/bx-six-pack.webp';
import OrderCard from '../components/OrderCard';

function AdminPanelMaster() {

    const {loading: allLoading, data: allData} = useQuery(QUERY_ORDERS_AND_USER);

    const [searchOrders, { data: searchData, loading: searchLoading }] = useLazyQuery(QUERY_SEARCH_PARAMS);

let orderSearch;
let allOrders;
let admin;

if(allData) {
    allOrders = allData.orders;
    admin = allData.user;
}

if(searchData) {
    admin = searchData.user;
    orderSearch = searchData.orderSearch;
}


 function onlyLetters(str) {
    console.log(str);
    var letters = /^[A-Za-z]+$/;
    var numbers = /^[0-9]+$/;
    var numbAndLet = /^[A-Za-z0-9]+$/;
    if (str.match(letters)) {
        searchOrders({ variables: { orderOwner: `${str}`}});
    } else if (str.match(numbers)) {
        searchOrders({ variables: { phoneNumber: `${str}`}});
    } else if (str.match(numbAndLet)) {
        searchOrders({ variables: { id: `${str}`}});
    } 
    } 
    
    
    function buttons(str) {
        console.log(str);
        if (str === 'undelivered') {
        console.log('undelivered')
        searchOrders({ variables: {orderStatus: "false"}});
    } else if (str === 'delivered') {
        console.log('delivered')
        searchOrders({ variables: {orderStatus: "true"}});
    }
    else if (str === 'all-orders') {
        console.log('delivered')
        window.location.reload();
    }
 };

function searchQuery() {
    let searchInput = document.querySelector('.order-search-input').value;
    onlyLetters(searchInput.trim());
    console.log(searchInput);
};

const buttonSearch = (event) => {
    let catButton = event.target;
    let category = catButton.getAttribute('id');
    console.log(category);
    buttons(category);
}

function initOrderData() {
        if(searchLoading || allLoading) {
            return (
                <>
                    <p>Loading...</p>
                </>
            )
        } if (orderSearch && admin.admin) {
            return (
                <>
                <div className='admin-orders'>  
        {orderSearch ? (
            <>   
                {orderSearch.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        } 
        if (!orderSearch && admin.admin) {
           
            return (
                <>
                <div className='admin-orders'>  
        {allOrders ? (
            <>   
                {allOrders.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        };
    }
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
    <div className='order-search-div'>
        <div className='search-bar-div'>
            <input className='order-search-input input'></input>
            <button className='button' onClick={searchQuery}>Search</button>
        </div>
        <div className='checkbox-div'>
           
                <button className='button cat-button' id='delivered' name='status' value='delivered' onClick={buttonSearch}>Delivered Orders</button>
            
                <button className='button cat-button' id='undelivered' name='status' value='undelivered' onClick={buttonSearch}>Undelivered Orders</button>
            
            
                <button className='button cat-button' id='all-orders' name='status' value='all-orders' onClick={buttonSearch}>All Orders</button>
            
        </div>
    </div>
    {initOrderData()}
 </>
)
};

export default AdminPanelMaster;